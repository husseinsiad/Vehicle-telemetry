import obd
import os
from datetime import datetime
from firebase import firebase
import time
from gps3 import gps3
import json
import speech_recognition as sr
import datetime as dt
import threading
import pyttsx3

#Version 0.3
#Date: 3/28/2020
#Last Author: Jacob Shearer
#Currently, the code is written under the assumption that the system will automatically run the code.
#If this is not the case then it is recommended to be run manually through a console while the vehicle is stationary.

#Debug Flags
    #To be deprecated. Using DEBUG_level instead
DEBUG_printToConsole = False
    #Sets the logging level of the code.
    #Level 1 alerts the beginning and end of the test
    #Level 2 alerts the beginning of different functions
DEBUG_level = 2
    #Run the test at the end. Replace this when a full loop is implemented.
DEBUG_runTest = False

class OBDManager:
    def __init__(self):
        if DEBUG_level >= 2: print('### BUILDING CLASS...\n')
        
        ##db path for our accounts
        Jacob = '8mNJh20teceTE7eUcf7WtF0RwI22'
        Jeremy = 'BvbqNMlfdbTw537WJYUDWYxfHIy1'
        Hussein = 'CYFfFMSnffRuE9nJzbwogTza2523'
        Jessica = 'UPOScX4oVRW6cAXZLZmnDkVFhqq2'
        #Establish connection to OBD scanner
        ##Set scanner to MS mode for vehicles excluding Ford
        ##Set scanner to HS mode for Ford vehicles
        ###Mark down all vehicle information for vehicles that do not follow these rules
        self.connection = obd.OBD()
        self.index = 1
        self.firebase = firebase.FirebaseApplication('https://se491-5f60f.firebaseio.com', None)
        self.timestamp = datetime.now().strftime("%m-%d-%Y %H:%M:%S")
        self.dummyID = 'Dq4kHPdpo5aeNqhCHjd8LHmeGV66' #Temporary until a real ID is given; randomly generated
        self.url = '/Users/' + Jessica + '/TripData/Trip ' + self.timestamp
        
        self.gps_socket = gps3.GPSDSocket()
        self.data_stream = gps3.DataStream()
        self.gps_socket.connect()
        self.gps_socket.watch()
        
        self.rec = sr.Recognizer()
        self.mic = sr.Microphone()
        
        self.speechEngine = pyttsx3.init()

        #All commands to be grabbed from the vehicle
        self.commandList =[obd.commands.RPM,
                           obd.commands.RUN_TIME,
                           obd.commands.SPEED,
                           obd.commands.FUEL_LEVEL,
                           obd.commands.ENGINE_LOAD,
                           obd.commands.COOLANT_TEMP,
                           obd.commands.OIL_TEMP,
                           obd.commands.BAROMETRIC_PRESSURE,
                           obd.commands.RELATIVE_THROTTLE_POS,
                           obd.commands.AMBIANT_AIR_TEMP] 

        self.commandNameList = []
        
        self.TPV_DataList ={'lat':'n/a',
                            'epy':'n/a', #Lattitudinal Error
                            'lon':'n/a',
                            'epx':'n/a', #Longitudinal Error
                            'track':'n/a',#Orientation with 0 and 360 being north
                            'alt' : 'n/a'} 

        #Go through the base command list and purge unsupported commands
        for cmd in self.commandList:
            if not self.connection.supports(cmd): self.commandList.remove(cmd)
        
        for cmd in self.commandList:
            cmdName = cmd.name.replace('_',' ')
            self.commandNameList += cmd.name
            print(cmdName)
  
    def sendData(self):
        if DEBUG_level >= 2: print('### SENDING DATA PACKET TO FIREBASE...\n')
        data = {}
       
        #For each of the commands...
        for command in self.commandList:
            #Get the commands name from the command table (in the obd library)
            name = command.name
         
            #Get the response for that command from the ECU
            ##NOTICE: This currently does not discriminate whether a reponse is given or not. Might be 'N/A'
            response = self.connection.query( command )
        
            #Plug the name and it's data into the dictionary
            data[name] = str(response.value)
       
        #Get GPS data packets for TPV
        TPV_Response = None
        gpsResponse = self.gps_socket.next(0.1)
        while (gpsResponse is not None):
            jsonData = json.loads(gpsResponse)
         
            if jsonData['class'] == 'TPV':
                TPV_Response = jsonData
           
            gpsResponse = self.gps_socket.next(0.1)
            
        #For each TPV data command...
        for command in self.TPV_DataList:
            name = command
            response = self.TPV_DataList[name]
            
            if not (TPV_Response == None):
                response = TPV_Response[name]
                self.TPV_DataList[name] = TPV_Response[name]
                
            data[name] = response
        
        data['index'] = self.index
        
        #SEND ALL DATA IN PACKET
        result = self.firebase.post(self.url, data)
        print(result)
        
    def sendDataLoop(self):
        self.index=1
        
        while True:
            self.sendData()
            self.index += 1
            time.sleep(.1)
            
    def listenLoop(self):
        try:
            with self.mic as source:
                self.rec.adjust_for_ambient_noise(source)
                print("Listening for activation phrase...")
                audio = self.rec.listen(source,timeout=3)
            
            msg = self.rec.recognize_google(audio).upper()
            
            if "KARMA" in msg:
                print("Activation phrase heard! Proceeding to command...")
                self.listenForCommand()
        except Exception as e:
            print("Error:",e)
            
        self.listenLoop()
            
    def listenForCommand(self):
        with self.mic as source:
            audio = self.rec.listen(source,timeout=10)
                
            msg = self.rec.recognize_google(audio).upper()
            
        print('\tRecognized Audio: ',msg)
            
        if ("TELL ME" in msg) or ("WHAT IS" in msg) or ("CHECK" in msg) or ("WHAT'S" in msg):
            for cmd in self.commandList:
                if cmd.name.replace('_',' ') in msg:
                    response = self.connection.query( cmd )
                    print("\tYour",cmd.name,"is",response.value)
                    self.speechEngine.say("\tYour "+str(cmd.name)+" is "+str(response.value))
                    self.speechEngine.runAndWait()
                    break
        
            
if __name__ == "__main__":
    mainClass = OBDManager()
    
    if DEBUG_runTest == True:
        voiceCommandThread  = threading.Thread(target=mainClass.listenLoop)
        voiceCommandThread.start()
    else:
        dataRecordingThread = threading.Thread(target=mainClass.sendDataLoop)
        voiceCommandThread  = threading.Thread(target=mainClass.listenLoop)
        dataRecordingThread.start()
        voiceCommandThread.start()

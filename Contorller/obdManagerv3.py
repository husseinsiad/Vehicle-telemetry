import obd
import os
from datetime import datetime
from firebase import firebase
import time
from gps3 import gps3
import json
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
DEBUG_runTest = True

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


        
        self.TPV_DataList ={'lat':'n/a',
                            'epy':'n/a', #Lattitudinal Error
                            'lon':'n/a',
                            'epx':'n/a', #Longitudinal Error
                            'track':'n/a',#Orientation with 0 and 360 being north
                            'alt' : 'n/a'} 

        #Go through the base command list and purge unsupported commands
        for cmd in self.commandList:
            if not self.connection.supports(cmd): self.commandList.remove(cmd)
            
#     def build_dict(self): #DEFUNC // UNUSED
#         if DEBUG_level >= 2: print('### PRINTING DATA TO CONSOLE...\n')
#         dictionary = {}
#         
#         #For each command in the command list...
#         for command in self.commandList:
#             
#             #Grab a reponse
#             response = self.connection.query( command )
#             
#             #If the response is not null, then work on it
#             if not response.is_null():
#                 
#                 #if debug printing is enabled, then print
#                 if DEBUG_printToConsole:
#                     print( command.name + ":" )
#                     print( "/t" + str( response.value ) )
#                 
#                 #Add a dcitionary entry for each valid response
#                 dictionary[str(command.name)] = response.value
#         
#         return dictionary
  
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
            
if DEBUG_runTest:
    if DEBUG_level >= 1: print('### BEGINNING TEST...\n')
    
    testClass = OBDManager()
    
    testClass.sendDataLoop()
    
    if DEBUG_level >= 1: print('### TEST COMPLETE...\n')
    
else:
    mainClass = OBDManager()
    
    mainClass.sendDataLoop() #Endless









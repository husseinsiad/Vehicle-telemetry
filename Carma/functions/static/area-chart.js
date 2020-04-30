// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
const firebaseConfig = {
  apiKey: 'AIzaSyC8ek2z-3xDI8rlaePQiOw-NDByJI8JqZ4',
  authDomain: 'se491-5f60f.firebaseapp.com',
  databaseURL: 'https://se491-5f60f.firebaseio.com',
  projectId: 'se491-5f60f',
  storageBucket: 'se491-5f60f.appspot.com',
  messagingSenderId: '541695700970',
  appId: '1:541695700970:web:1438c4a2ac47ea4fe4cc93',
  measurementId: 'G-08J4E1H1P2'
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
 

$("#currentUser").hide();

 
  $('#speedCheckBox').click(function(){
        
      if($(this).is(":checked")){
        // $("canvas").show();
        $("#rpmCheckBox").attr("disabled", true);
        $("#outsideCheckBox").attr("disabled", true);
        $("#tspCheckBox").attr("disabled", true);
        $("#fuelLevelCheckBox").attr("disabled", true);
        $("#engineTemCheckBox").attr("disabled", true);
        $("#engineLoadCheckBox").attr("disabled", true);
      
        var tripdate=$("#selectTripDate").val();
      //  console.log(tripdate);
 var tripDateValue= $(this).text();
 var db = firebase.database();
     var index=[];
     var totalIndex=0;
     var sumSpeed=0;
     var speedList=[];
     var currentUser=$("#currentUser").text();

	var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
          tripDateRef.on('value',function(snap){
            snap.forEach(function(childNodes){
              var speed=childNodes.val().SPEED;
              var i = speed.indexOf(" ");  // Gets the first index where a space occours
              speedList.push(parseInt(speed.substr(0, i))); // Gets the first part
              // index.push(childNodes.val().index);
              var min = childNodes.val().index/60
              min = Math.trunc(min);
              var sec = childNodes.val().index%60;
            if(sec < 10){
              var minSecLabel = min + ":0" + sec;
              index.push(minSecLabel);

            }else{
              var minSecLabel = min + ":" + sec;
              index.push(minSecLabel);
            }
             
              sumSpeed = sumSpeed + parseInt(speed.substr(0, i));
              totalIndex+=childNodes.val().index;
            })

            

            let avg = sumSpeed / snap.numChildren();
              var ctx = document.getElementById('myAreaChart');
            var myLineChart = new Chart(ctx,{
              type: 'line',
              data: {
                labels: index,
                // labels: ["1:00", "2:00", int 1, int 2, int 3, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                datasets: [{
                  label: "Speed",
                  // lineTension: 0.3,
                  backgroundColor: "rgba(2,117,216,0.2)",
                  borderColor: "rgba(2,117,216,1)",
                  // pointRadius: 5,
                  // pointBackgroundColor: "rgb(0,128,0)",
                  pointBorderColor: "rgba(255,255,255,0.8)",
                  pointHoverRadius: 1,
                  pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  // pointHitRadius: 10,
                  pointBorderWidth: 0,
                  // data:speedList,
                  data: speedList,
                }],
              },
              options: {
                scales: {
                  xAxes: [{
                    time: {
                      unit: 'date'
                    },
                    gridLines: {
                      display: false
                    },
                    ticks: {
                      maxTicksLimit: totalIndex
                    }
                  }],
                  yAxes: [{
                     
                    ticks: {
                      min: 0,
                      max: 130,
                      maxTicksLimit: 5
                    },
                    gridLines: {
                      color: "rgba(0, 0, 0, .125)",
                    }
                  }],
                },
                legend: {
                  display: false
                }
              }
            });
 
            
          

          })

      }
      else if($(this).is(":not(:checked)")){
        $("#rpmCheckBox").attr("disabled", false);
        $("#outsideCheckBox").attr("disabled", false);
        $("#tspCheckBox").attr("disabled", false);
        $("#fuelLevelCheckBox").attr("disabled", false);
        $("#engineTemCheckBox").attr("disabled", false);
        $("#engineLoadCheckBox").attr("disabled", false);
          var ctx = document.getElementById("myAreaChart");
          var myLineChart = new Chart(ctx,{
            type: 'line',
            data: {
              // labels: index,
              labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
              datasets: [{
                label: "Speed",
                // lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                // pointRadius: 5,
                // pointBackgroundColor: "rgb(0,128,0)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 1,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                // pointHitRadius: 50,
                // pointBorderWidth: 2,
                // data:speedList,
                data: [0,0,0,0,0,0,0,0,0,0],
              }],
            },
            options: {
              scales: {
                xAxes: [{
                  time: {
                    unit: 'date'
                  },
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    maxTicksLimit: 8
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 130,
                    maxTicksLimit: 5
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                  }
                }],
              },
              legend: {
                display: false
              }
            }
          });
           
          $("#refresh").load(location.href + " #refresh");
             
 
      }
  });

  $('#rpmCheckBox').click(function(){
    if($(this).is(":checked")){
      $("canvas").show();
        $("#speedCheckBox").attr("disabled", true);
        $("#outsideCheckBox").attr("disabled", true);
        $("#tspCheckBox").attr("disabled", true);
        $("#fuelLevelCheckBox").attr("disabled", true);
        $("#engineTemCheckBox").attr("disabled", true);
        $("#engineLoadCheckBox").attr("disabled", true);
    
      var tripdate=$("#selectTripDate").val();
      // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var rpmList=[];
      var currentUser=$("#currentUser").text();
   var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var rpm=childNodes.val().RPM;
               var i = rpm.indexOf(" ");  // Gets the first index where a space occours
                rpmList.push(Math.round(parseFloat(rpm.substr(0, i)))); // Gets the first part
              //  index.push(childNodes.val().index);
              var min = childNodes.val().index/60
              min = Math.trunc(min);
              var sec = childNodes.val().index%60;
            if(sec < 10){
              var minSecLabel = min + ":0" + sec;
              index.push(minSecLabel);

            }else{
              var minSecLabel = min + ":" + sec;
              index.push(minSecLabel);
            }
               totalIndex+=childNodes.val().index;
             })
            //  console.log("Index" +index)
            //  console.log("rpm "+parseFloat(rpmList));
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "RPM",
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(128,0,0,0.6)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: rpmList,
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: totalIndex
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: 0,
                       max: 8000,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });
           
 
           })
        // $("#results").html(tripdate);
        //  $("canvas").hide();
    }
    else if($(this).is(":not(:checked)")){
      $("#speedCheckBox").attr("disabled", false);
      $("#outsideCheckBox").attr("disabled", false);
      $("#tspCheckBox").attr("disabled", false);
      $("#fuelLevelCheckBox").attr("disabled", false);
      $("#engineTemCheckBox").attr("disabled", false);
      $("#engineLoadCheckBox").attr("disabled", false);
      var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                //  labels: index,
                 labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
                 datasets: [{
                   label: "RPM",
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(128,0,0,0.6)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: [1,2,3,4,5,6,7,8,9,10],
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: 10
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: 0,
                       max: 8000,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });
 
        $("#refresh").load(location.href + " #refresh");

    }
});

$('#outsideCheckBox').click(function(){
  if($(this).is(":checked")){
    $("#speedCheckBox").attr("disabled", true);
    $("#tspCheckBox").attr("disabled", true);
    $("#fuelLevelCheckBox").attr("disabled", true);
    $("#engineTemCheckBox").attr("disabled", true);
    $("#engineLoadCheckBox").attr("disabled", true);
    $("#rpmCheckBox ").attr("disabled", true);
    
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var tempratureList=[];
      var currentUser=$("#currentUser").text();
   var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var temp=childNodes.val().AMBIANT_AIR_TEMP;
               var i = temp.indexOf(" ");  // Gets the first index where a space occours
               tempratureList.push(parseFloat(temp.substr(0, i))).toFixed(2); // Gets the first part
               var min = childNodes.val().index/60
               min = Math.trunc(min);
               var sec = childNodes.val().index%60;
             if(sec < 10){
               var minSecLabel = min + ":0" + sec;
               index.push(minSecLabel);
 
             }else{
               var minSecLabel = min + ":" + sec;
               index.push(minSecLabel);
             }
               totalIndex+=childNodes.val().index;
             })
            //  console.log("Index" +index)
            //  console.log("temp "+parseFloat(tempratureList).toFixed(2));
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "Outside Temprature",
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(0,255,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: tempratureList,
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: totalIndex
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: -40,
                       max: 40,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });
           
 
           })
   
  }
  else if($(this).is(":not(:checked)")){
    $("#rpmCheckBox ").attr("disabled", false);
    $("#speedCheckBox").attr("disabled", false);
    $("#tspCheckBox").attr("disabled", false);
    $("#fuelLevelCheckBox").attr("disabled", false);
    $("#engineTemCheckBox").attr("disabled", false);
    $("#engineLoadCheckBox").attr("disabled", false);
    var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                //  labels: index,
                 labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
                 datasets: [{
                   label: "Outside Temprature",
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(0,255,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: [1,2,3,4,5,6,7,8,9,10],
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: 10
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: -40,
                       max: 40,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });

             $("#refresh").load(location.href + " #refresh");
             
  }
});


$('#tspCheckBox').click(function(){
   
  if($(this).is(":checked")){
    $("#outsideCheckBox ").attr("disabled", true);
    $("#speedCheckBox").attr("disabled", true);
    $("#fuelLevelCheckBox").attr("disabled", true);
    $("#engineTemCheckBox").attr("disabled", true);
    $("#rpmCheckBox").attr("disabled", true);
    $("#engineLoadCheckBox").attr("disabled", true);
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
    var db = firebase.database();
        var index=[];
        var totalIndex=0;
        var Throttle_positionList=[];
        var currentUser=$("#currentUser").text();
     var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
             tripDateRef.on('value',function(snap){
               snap.forEach(function(childNodes){
                 var tps=childNodes.val().RELATIVE_THROTTLE_POS;
                 var i = tps.indexOf(" ");  // Gets the first index where a space occours
                 Throttle_positionList.push(Math.round(parseFloat(tps.substr(0, i)))); // Gets the first part
                 var min = childNodes.val().index/60
                 min = Math.trunc(min);
                 var sec = childNodes.val().index%60;
               if(sec < 10){
                 var minSecLabel = min + ":0" + sec;
                 index.push(minSecLabel);
   
               }else{
                 var minSecLabel = min + ":" + sec;
                 index.push(minSecLabel);
               }
                 totalIndex+=childNodes.val().index;
               })
              //  console.log("Index" +index)
              //  console.log("Throttle_positionList "+Throttle_positionList);
           
               var ctx = document.getElementById("myAreaChart");
               var myLineChart = new Chart(ctx,{
                 type: 'line',
                 data: {
                   labels: index,
                   // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                   datasets: [{
                     label: "Throttle_position%",
                    //  lineTension: 0.3,
                     backgroundColor: "rgba(2,117,216,0.2)",
                     borderColor: "rgba(2,117,216,1)",
                    //  pointRadius: 5,
                    //  pointBackgroundColor: "rgb(255,255,0)",
                     pointBorderColor: "rgba(255,255,255,0.8)",
                     pointHoverRadius: 0,
                     pointHoverBackgroundColor: "rgba(2,117,216,1)",
                    //  pointHitRadius: 50,
                    //  pointBorderWidth: 2,
                     // data:speedList,
                     data: Throttle_positionList,
                   }],
                 },
                 options: {
                   scales: {
                     xAxes: [{
                       time: {
                         unit: 'date'
                       },
                       gridLines: {
                         display: false
                       },
                       ticks: {
                         maxTicksLimit: totalIndex
                       }
                     }],
                     yAxes: [{
                       ticks: {
                         min: 0,
                         max: 100,
                         maxTicksLimit: 5
                       },
                       gridLines: {
                         color: "rgba(0, 0, 0, .125)",
                       }
                     }],
                   },
                   legend: {
                     display: false
                   }
                 }
               });
             
   
             })
  }
  else if($(this).is(":not(:checked)")){
    $("#outsideCheckBox ").attr("disabled", false);
    $("#speedCheckBox").attr("disabled", false);
    $("#fuelLevelCheckBox").attr("disabled", false);
    $("#engineTemCheckBox").attr("disabled", false);
    $("#rpmCheckBox").attr("disabled", false);
    $("#engineLoadCheckBox").attr("disabled", false);
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx,{
      type: 'line',
      data: {
        // labels: index,
        labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
        datasets: [{
          label: "Throttle_position%",
          // lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          // pointRadius: 5,
          // pointBackgroundColor: "rgb(255,255,0)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          // pointHitRadius: 50,
          // pointBorderWidth: 2,
          // data:speedList,
          data: [1,2,3,4,5,6,7,8,9,10],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });

    $("#refresh").load(location.href + " #refresh");
  }
});


$('#fuelLevelCheckBox').click(function(){
  if($(this).is(":checked")){
    $("#outsideCheckBox ").attr("disabled", true);
    $("#speedCheckBox").attr("disabled", true);
    $("#tspCheckBox").attr("disabled", true);
    $("#engineTemCheckBox").attr("disabled", true);
    $("#rpmCheckBox").attr("disabled", true);
    $("#engineLoadCheckBox").attr("disabled", true);
    var tripdate=$("#selectTripDate").val();
 
    // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var fuelLevelList=[];
      var currentUser=$("#currentUser").text();
   var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var fuelLevel=childNodes.val().FUEL_LEVEL;
               var i = fuelLevel.indexOf(" ");  // Gets the first index where a space occours
               fuelLevelList.push(Math.round(parseFloat(fuelLevel.substr(0, i)))); // Gets the first part
               var min = childNodes.val().index/60
               min = Math.trunc(min);
               var sec = childNodes.val().index%60;
             if(sec < 10){
               var minSecLabel = min + ":0" + sec;
               index.push(minSecLabel);
 
             }else{
               var minSecLabel = min + ":" + sec;
               index.push(minSecLabel);
             }
               totalIndex+=childNodes.val().index;
             })
            //  console.log("Index" +index)
            //  console.log("fuelLevelList "+fuelLevelList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Fuel level',
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(255,0,255)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: fuelLevelList,
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: totalIndex
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: 0,
                       max: 100,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });
           
 
           })
  }
  else if($(this).is(":not(:checked)")){
    $("#outsideCheckBox ").attr("disabled", false);
    $("#speedCheckBox").attr("disabled", false);
    $("#tspCheckBox").attr("disabled", false);
    $("#engineTemCheckBox").attr("disabled", false);
    $("#rpmCheckBox").attr("disabled", false);
    $("#engineLoadCheckBox").attr("disabled", false);
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx,{
      type: 'line',
      data: {
        // labels: index,
        labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
        datasets: [{
          label: 'Fuel level',
          // lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          // pointRadius: 5,
          // pointBackgroundColor: "rgb(255,0,255)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          // pointHitRadius: 50,
          // pointBorderWidth: 2,
          // data:speedList,
          data: [1,2,3,4,5,6,7,8,9,10],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
    $("#refresh").load(location.href + " #refresh");
  }
});


$('#engineTemCheckBox').click(function(){
  if($(this).is(":checked")){
    $("#outsideCheckBox ").attr("disabled", true);
    $("#speedCheckBox").attr("disabled", true);
    $("#tspCheckBox").attr("disabled", true);
    $("#fuelLevelCheckBox").attr("disabled", true);
    $("#rpmCheckBox").attr("disabled", true);
    $("#engineLoadCheckBox").attr("disabled", true);
    
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
    var db = firebase.database();
        var index=[];
        var totalIndex=0;
        var COOLANT_TEMPList=[];
        var currentUser=$("#currentUser").text();
     var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
             tripDateRef.on('value',function(snap){
               snap.forEach(function(childNodes){
                 var coolantTemp=childNodes.val().COOLANT_TEMP;
                 var i = coolantTemp.indexOf(" ");  // Gets the first index where a space occours
                 COOLANT_TEMPList.push(parseInt(coolantTemp.substr(0, i))); // Gets the first part
                 var min = childNodes.val().index/60
                 min = Math.trunc(min);
                 var sec = childNodes.val().index%60;
               if(sec < 10){
                 var minSecLabel = min + ":0" + sec;
                 index.push(minSecLabel);
   
               }else{
                 var minSecLabel = min + ":" + sec;
                 index.push(minSecLabel);
               }
                 totalIndex+=childNodes.val().index;
               })
              //  console.log("Index" +index)
              //  console.log("fuelLevelList "+COOLANT_TEMPList);
           
               var ctx = document.getElementById("myAreaChart");
               var myLineChart = new Chart(ctx,{
                 type: 'line',
                 data: {
                   labels: index,
                   // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                   datasets: [{
                     label: 'Engine Temp',
                    //  lineTension: 0.3,
                     backgroundColor: "rgba(2,117,216,0.2)",
                     borderColor: "rgba(2,117,216,1)",
                    //  pointRadius: 5,
                    //  pointBackgroundColor: "rgb(0,0,255)	",
                     pointBorderColor: "rgba(255,255,255,0.8)",
                     pointHoverRadius: 0,
                     pointHoverBackgroundColor: "rgba(2,117,216,1)",
                    //  pointHitRadius: 50,
                    //  pointBorderWidth: 2,
                     // data:speedList,
                     data: COOLANT_TEMPList,
                   }],
                 },
                 options: {
                   scales: {
                     xAxes: [{
                       time: {
                         unit: 'date'
                       },
                       gridLines: {
                         display: false
                       },
                       ticks: {
                         maxTicksLimit: totalIndex
                       }
                     }],
                     yAxes: [{
                       ticks: {
                         min: 0,
                         max: 100,
                         maxTicksLimit: 5
                       },
                       gridLines: {
                         color: "rgba(0, 0, 0, .125)",
                       }
                     }],
                   },
                   legend: {
                     display: false
                   }
                 }
               });
             
   
             })
   
  }
  else if($(this).is(":not(:checked)")){
    $("#outsideCheckBox ").attr("disabled", false);
    $("#speedCheckBox").attr("disabled", false);
    $("#tspCheckBox").attr("disabled", false);
    $("#fuelLevelCheckBox").attr("disabled", false);
    $("#rpmCheckBox").attr("disabled", false);
    $("#engineLoadCheckBox").attr("disabled", false);
    
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx,{
      type: 'line',
      data: {
        // labels: index,
        labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
        datasets: [{
          label: 'Engine Temp',
          // lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          // pointRadius: 5,
          // pointBackgroundColor: "rgb(0,0,255)	",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          // pointHitRadius: 50,
          // pointBorderWidth: 2,
          // data:speedList,
          data: [1,2,3,4,5,6,7,8,9,10],
        }],
      },
      options: {
        scales: {
          xAxes: [{
            
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              maxTicksLimit: 5
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
    $("#refresh").load(location.href + " #refresh");
  }
});


$('#engineLoadCheckBox').click(function(){
  if($(this).is(":checked")){
    $("#outsideCheckBox ").attr("disabled", true);
    $("#speedCheckBox").attr("disabled", true);
    $("#tspCheckBox").attr("disabled", true);
    $("#fuelLevelCheckBox").attr("disabled", true);
    $("#rpmCheckBox").attr("disabled", true);
    $("#engineTemCheckBox").attr("disabled", true);
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var ENGINE_LOADList=[];
      var currentUser=$("#currentUser").text();
   var tripDateRef=db.ref('/Users/'+currentUser.trim()+'/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var engineLoad=childNodes.val().ENGINE_LOAD;
               var i = engineLoad.indexOf(" ");  // Gets the first index where a space occours
               ENGINE_LOADList.push(Math.round(parseFloat(engineLoad.substr(0, i)))); // Gets the first part
               var min = childNodes.val().index/60
              min = Math.trunc(min);
              var sec = childNodes.val().index%60;
            if(sec < 10){
              var minSecLabel = min + ":0" + sec;
              index.push(minSecLabel);

            }else{
              var minSecLabel = min + ":" + sec;
              index.push(minSecLabel);
            }
               totalIndex+=childNodes.val().index;
             })
            //  console.log("Index" +index)
            //  console.log("fuelLevelList "+ENGINE_LOADList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Engine Load',
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(128,128,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: ENGINE_LOADList,
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: totalIndex
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: 0,
                       max: 100,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });
           
 
           })
  }
  else if($(this).is(":not(:checked)")){
    $("#outsideCheckBox ").attr("disabled", false);
    $("#speedCheckBox").attr("disabled", false);
    $("#tspCheckBox").attr("disabled", false);
    $("#fuelLevelCheckBox").attr("disabled", false);
    $("#rpmCheckBox").attr("disabled", false);
    $("#engineTemCheckBox").attr("disabled", false);
    var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                //  labels: index,
                 labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
                 datasets: [{
                   label: 'Engine Load',
                  //  lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                  //  pointRadius: 5,
                  //  pointBackgroundColor: "rgb(128,128,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  //  pointHitRadius: 50,
                  //  pointBorderWidth: 2,
                   // data:speedList,
                   data: [1,2,3,4,5,6,7,8,9,10],
                 }],
               },
               options: {
                 scales: {
                   xAxes: [{
                     time: {
                       unit: 'date'
                     },
                     gridLines: {
                       display: false
                     },
                     ticks: {
                       maxTicksLimit: 10
                     }
                   }],
                   yAxes: [{
                     ticks: {
                       min: 0,
                       max: 100,
                       maxTicksLimit: 5
                     },
                     gridLines: {
                       color: "rgba(0, 0, 0, .125)",
                     }
                   }],
                 },
                 legend: {
                   display: false
                 }
               }
             });
             $("#refresh").load(location.href + " #refresh");
  }
});
 
 
 
 
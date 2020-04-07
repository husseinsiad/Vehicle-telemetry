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

 
  $('#speedCheckBox').click(function(){
      if($(this).is(":checked")){
        // window.onload = function () {
        //   var ctx = document.getElementById('myAreaChart');
        //   var context = ctx.getContext('2d');
        //   context.clear();
        // }
       
        var tripdate=$("#selectTripDate").val();
       console.log(tripdate);
 var tripDateValue= $(this).text();
 var db = firebase.database();
     var index=[];
     var totalIndex=0;
     var sumSpeed=0;
     var speedList=[];
	var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
          tripDateRef.on('value',function(snap){
            snap.forEach(function(childNodes){
              var speed=childNodes.val().SPEED;
              var i = speed.indexOf(" ");  // Gets the first index where a space occours
              speedList.push(parseInt(speed.substr(0, i))); // Gets the first part
              index.push(childNodes.val().index);
              sumSpeed = sumSpeed + parseInt(speed.substr(0, i));
              totalIndex+=childNodes.val().index;
            })
            let avg = sumSpeed / snap.numChildren();
            console.log("sumSpeed " +sumSpeed)
            console.log("NumberOfChildreen " +snap.numChildren())
            console.log("Average " +Math.round(avg))
            console.log("Index" +index)
            console.log("speed "+speedList);
           
              var ctx = document.getElementById('myAreaChart');
              var context = ctx.getContext('2d');
            
              // do some drawing
              // var canvas = document.getElementById("myAreaChart");
            var myLineChart = new Chart(ctx,{
              type: 'line',
              data: {
                labels: index,
                // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                datasets: [{
                  label: "Speed",
                  lineTension: 0.3,
                  backgroundColor: "rgba(2,117,216,0.2)",
                  borderColor: "rgba(2,117,216,1)",
                  pointRadius: 5,
                  pointBackgroundColor: "rgb(0,128,0)",
                  pointBorderColor: "rgba(255,255,255,0.8)",
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  pointHitRadius: 50,
                  pointBorderWidth: 2,
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
         
          var ctx = document.getElementById("myAreaChart");
          var myLineChart = new Chart(ctx,{
            type: 'line',
            data: {
              // labels: index,
              labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
              datasets: [{
                label: "Speed",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgb(0,128,0)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
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
           
     
      
          // $("#result").html("Checkbox is unchecked.");
      }
  });

  $('#rpmCheckBox').click(function(){
    if($(this).is(":checked")){
        
      var tripdate=$("#selectTripDate").val();
      // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var rpmList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var rpm=childNodes.val().RPM;
               var i = rpm.indexOf(" ");  // Gets the first index where a space occours
               rpmList.push(Math.round(parseFloat(rpm.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("rpm "+parseFloat(rpmList));
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "RPM",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(128,0,0,0.6)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
    }
    else if($(this).is(":not(:checked)")){
     
      var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                //  labels: index,
                 labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
                 datasets: [{
                   label: "RPM",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(128,0,0,0.6)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
        // $("#results").html("RPM is unchecked.");
    }
});

$('#outsideCheckBox').click(function(){
  if($(this).is(":checked")){
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var tempratureList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var temp=childNodes.val().AMBIANT_AIR_TEMP;
               var i = temp.indexOf(" ");  // Gets the first index where a space occours
               tempratureList.push(parseFloat(temp.substr(0, i))).toFixed(2); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("temp "+parseFloat(tempratureList).toFixed(2));
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "Outside Temprature",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(0,255,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
    var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                //  labels: index,
                 labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
                 datasets: [{
                   label: "Outside Temprature",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(0,255,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
  }
});


$('#TspCheckBox').click(function(){
  if($(this).is(":checked")){
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
    var db = firebase.database();
        var index=[];
        var totalIndex=0;
        var Throttle_positionList=[];
     var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
             tripDateRef.on('value',function(snap){
               snap.forEach(function(childNodes){
                 var tps=childNodes.val().RELATIVE_THROTTLE_POS;
                 var i = tps.indexOf(" ");  // Gets the first index where a space occours
                 Throttle_positionList.push(Math.round(parseFloat(tps.substr(0, i)))); // Gets the first part
                 index.push(childNodes.val().index);
                 totalIndex+=childNodes.val().index;
               })
               console.log("Index" +index)
               console.log("Throttle_positionList "+Throttle_positionList);
           
               var ctx = document.getElementById("myAreaChart");
               var myLineChart = new Chart(ctx,{
                 type: 'line',
                 data: {
                   labels: index,
                   // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                   datasets: [{
                     label: "Throttle_position%",
                     lineTension: 0.3,
                     backgroundColor: "rgba(2,117,216,0.2)",
                     borderColor: "rgba(2,117,216,1)",
                     pointRadius: 5,
                     pointBackgroundColor: "rgb(255,255,0)",
                     pointBorderColor: "rgba(255,255,255,0.8)",
                     pointHoverRadius: 0,
                     pointHoverBackgroundColor: "rgba(2,117,216,1)",
                     pointHitRadius: 50,
                     pointBorderWidth: 2,
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
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx,{
      type: 'line',
      data: {
        // labels: index,
        labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
        datasets: [{
          label: "Throttle_position%",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgb(255,255,0)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
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
  }
});


$('#fuelLevelCheckBox').click(function(){
  if($(this).is(":checked")){
    var tripdate=$("#selectTripDate").val();
 
    // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var fuelLevelList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var fuelLevel=childNodes.val().FUEL_LEVEL;
               var i = fuelLevel.indexOf(" ");  // Gets the first index where a space occours
               fuelLevelList.push(Math.round(parseFloat(fuelLevel.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("fuelLevelList "+fuelLevelList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Fuel level',
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(255,0,255)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx,{
      type: 'line',
      data: {
        // labels: index,
        labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
        datasets: [{
          label: 'Fuel level',
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgb(255,0,255)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
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
  }
});


$('#engineTemCheckBox').click(function(){
  if($(this).is(":checked")){
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
    var db = firebase.database();
        var index=[];
        var totalIndex=0;
        var COOLANT_TEMPList=[];
     var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
             tripDateRef.on('value',function(snap){
               snap.forEach(function(childNodes){
                 var coolantTemp=childNodes.val().COOLANT_TEMP;
                 var i = coolantTemp.indexOf(" ");  // Gets the first index where a space occours
                 COOLANT_TEMPList.push(parseInt(coolantTemp.substr(0, i))); // Gets the first part
                 index.push(childNodes.val().index);
                 totalIndex+=childNodes.val().index;
               })
               console.log("Index" +index)
               console.log("fuelLevelList "+COOLANT_TEMPList);
           
               var ctx = document.getElementById("myAreaChart");
               var myLineChart = new Chart(ctx,{
                 type: 'line',
                 data: {
                   labels: index,
                   // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                   datasets: [{
                     label: 'Engine Temp',
                     lineTension: 0.3,
                     backgroundColor: "rgba(2,117,216,0.2)",
                     borderColor: "rgba(2,117,216,1)",
                     pointRadius: 5,
                     pointBackgroundColor: "rgb(0,0,255)	",
                     pointBorderColor: "rgba(255,255,255,0.8)",
                     pointHoverRadius: 0,
                     pointHoverBackgroundColor: "rgba(2,117,216,1)",
                     pointHitRadius: 50,
                     pointBorderWidth: 2,
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
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx,{
      type: 'line',
      data: {
        // labels: index,
        labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
        datasets: [{
          label: 'Engine Temp',
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgb(0,0,255)	",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 0,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
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
  }
});


$('#engineLoadCheckBox').click(function(){
  if($(this).is(":checked")){
    var tripdate=$("#selectTripDate").val();
    // var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var ENGINE_LOADList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var engineLoad=childNodes.val().ENGINE_LOAD;
               var i = engineLoad.indexOf(" ");  // Gets the first index where a space occours
               ENGINE_LOADList.push(Math.round(parseFloat(engineLoad.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("fuelLevelList "+ENGINE_LOADList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Engine Load',
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(128,128,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
    var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                //  labels: index,
                 labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10],
                 datasets: [{
                   label: 'Engine Load',
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(128,128,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
  }
});
 
 //SPEED OPTION
$('#btnSpeed.dropdown-item').on('click', function() {
   
  var tripdate=$("#selectTripDate").val();
  console.log(tripdate);
 var tripDateValue= $(this).text();
 var db = firebase.database();
     var index=[];
     var totalIndex=0;
     var sumSpeed=0;
     var speedList=[];
	var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripdate); 
          tripDateRef.on('value',function(snap){
            snap.forEach(function(childNodes){
              var speed=childNodes.val().SPEED;
              var i = speed.indexOf(" ");  // Gets the first index where a space occours
              speedList.push(parseInt(speed.substr(0, i))); // Gets the first part
              index.push(childNodes.val().index);
              sumSpeed = sumSpeed + parseInt(speed.substr(0, i));
              totalIndex+=childNodes.val().index;
            })
            let avg = sumSpeed / snap.numChildren();
            console.log("sumSpeed " +sumSpeed)
            console.log("NumberOfChildreen " +snap.numChildren())
            console.log("Average " +Math.round(avg))
            console.log("Index" +index)
            console.log("speed "+speedList);
        
            var ctx = document.getElementById("myAreaChart");
            var myLineChart = new Chart(ctx,{
              type: 'line',
              data: {
                labels: index,
                // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                datasets: [{
                  label: "Speed",
                  lineTension: 0.3,
                  backgroundColor: "rgba(2,117,216,0.2)",
                  borderColor: "rgba(2,117,216,1)",
                  pointRadius: 5,
                  pointBackgroundColor: "rgb(0,128,0)",
                  pointBorderColor: "rgba(255,255,255,0.8)",
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(2,117,216,1)",
                  pointHitRadius: 50,
                  pointBorderWidth: 2,
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

     
});

//RPM OPTION
$('#btnRpm.dropdown-item').on('click', function() {
  var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var rpmList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateValue); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var rpm=childNodes.val().RPM;
               var i = rpm.indexOf(" ");  // Gets the first index where a space occours
               rpmList.push(Math.round(parseFloat(rpm.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("rpm "+parseFloat(rpmList));
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "RPM",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(128,0,0,0.6)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
 
      
 });


 //Outside Temprature OPTION
$('#btnOutsideTemp.dropdown-item').on('click', function() {
  var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var tempratureList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateValue); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var temp=childNodes.val().AMBIANT_AIR_TEMP;
               var i = temp.indexOf(" ");  // Gets the first index where a space occours
               tempratureList.push(parseFloat(temp.substr(0, i))).toFixed(2); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("temp "+parseFloat(tempratureList).toFixed(2));
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "Outside Temprature",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(0,255,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
 
      
 });
  //Throttle_position OPTION
$('#btnThrottle_position.dropdown-item').on('click', function() {
  var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var Throttle_positionList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateValue); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var tps=childNodes.val().RELATIVE_THROTTLE_POS;
               var i = tps.indexOf(" ");  // Gets the first index where a space occours
               Throttle_positionList.push(Math.round(parseFloat(tps.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("Throttle_positionList "+Throttle_positionList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: "Throttle_position%",
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(255,255,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
 
      
 });

   //Fuel level% OPTION
$('#btnFuelLevel.dropdown-item').on('click', function() {
  var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var fuelLevelList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateValue); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var fuelLevel=childNodes.val().FUEL_LEVEL;
               var i = fuelLevel.indexOf(" ");  // Gets the first index where a space occours
               fuelLevelList.push(Math.round(parseFloat(fuelLevel.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("fuelLevelList "+fuelLevelList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Fuel level',
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(255,0,255)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
 
      
 });

   //Engine Temp OPTION
$('#btnEngineTemp.dropdown-item').on('click', function() {
  var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var COOLANT_TEMPList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateValue); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var coolantTemp=childNodes.val().COOLANT_TEMP;
               var i = coolantTemp.indexOf(" ");  // Gets the first index where a space occours
               COOLANT_TEMPList.push(parseInt(coolantTemp.substr(0, i))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("fuelLevelList "+COOLANT_TEMPList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Engine Temp',
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(0,0,255)	",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
 
      
 });

 //Engine Load OPTION
$('#btnEngineLoad.dropdown-item').on('click', function() {
  var tripDateValue= $(this).text();
  var db = firebase.database();
      var index=[];
      var totalIndex=0;
      var ENGINE_LOADList=[];
   var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateValue); 
           tripDateRef.on('value',function(snap){
             snap.forEach(function(childNodes){
               var engineLoad=childNodes.val().ENGINE_LOAD;
               var i = engineLoad.indexOf(" ");  // Gets the first index where a space occours
               ENGINE_LOADList.push(Math.round(parseFloat(engineLoad.substr(0, i)))); // Gets the first part
               index.push(childNodes.val().index);
               totalIndex+=childNodes.val().index;
             })
             console.log("Index" +index)
             console.log("fuelLevelList "+ENGINE_LOADList);
         
             var ctx = document.getElementById("myAreaChart");
             var myLineChart = new Chart(ctx,{
               type: 'line',
               data: {
                 labels: index,
                 // labels: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22, 23, 24, 25, 26],
                 datasets: [{
                   label: 'Engine Load',
                   lineTension: 0.3,
                   backgroundColor: "rgba(2,117,216,0.2)",
                   borderColor: "rgba(2,117,216,1)",
                   pointRadius: 5,
                   pointBackgroundColor: "rgb(128,128,0)",
                   pointBorderColor: "rgba(255,255,255,0.8)",
                   pointHoverRadius: 0,
                   pointHoverBackgroundColor: "rgba(2,117,216,1)",
                   pointHitRadius: 50,
                   pointBorderWidth: 2,
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
 
      
 });
 
 
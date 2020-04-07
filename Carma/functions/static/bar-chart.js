// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
	'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
 
$(document).ready(function() {

});
 

$('#btnTripSpeed.dropdown-item').on('click', function() {
	var db = firebase.database();
	var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData');
		var tripDateList=[];
		var sumSpeed=0;
	tripDateRef.on("value", function(snap) {
		snap.forEach(function(childNodes){
			tripDateList.push(childNodes.key);
		})
		//outer loop it loops until trip ends
		var aveSpeedList=[];
		var aveRpmList=[];
		
		for(var i=0;i<tripDateList.length;i++){
			var sumSpeed=0;
		    var sumRpm=0;
			var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateList[i]); 
			tripDateRef.on('value',function(snap){
				//Inner loop calculating average
			  snap.forEach(function(childNodes){
				var speed=childNodes.val().SPEED;
				var rpm=childNodes.val().RPM;
				var i = speed.indexOf(" ");  // Gets the first index where a space occours
				var i = rpm.indexOf(" ");  // Gets the first index where a space occours
				sumSpeed = sumSpeed + parseInt(speed.substr(0, i)) || 0;
				// console.log("Speed " +speed +" "+ childNodes.key);
				sumRpm = sumRpm + parseInt(rpm.substr(0, i));
				// console.log("RPM " +rpm +" "+ childNodes.key);
			  })
			//   let finalSumSpeed=Math.round(sumSpeed / snap.numChildren());
			  aveSpeedList.push(Math.round(sumSpeed / snap.numChildren()));
			  aveRpmList.push(Math.round(sumRpm / snap.numChildren()));
			//   console.log("Number off "+snap.numChildren())
			//   console.log("Average Speed "+aveSpeedList)
			//   console.log("Average RPM "+aveRpmList)
			});//end snapshot
			 
		}

	
		  
		  var ctx = document.getElementById('myBarChart');
	  var myLineChart = new Chart(ctx, {
		  type: 'bar',
		  data: {
			  labels: tripDateList,
			  datasets: [
				  {
					  label: 'Total:',
					  backgroundColor: 'rgba(2,117,216,1)',
					  borderColor: 'rgba(2,117,216,1)',
					  data: aveSpeedList
				  }
			  ]
		  },
		  options: {
			  scales: {
				  xAxes: [
					  {
						  time: {
							  unit: 'month'
						  },
						  gridLines: {
							  display: false
						  },
						  ticks: {
							  maxTicksLimit: 6
						  }
					  }
				  ],
				  yAxes: [
					  {
						  ticks: {
							  min: 0,
							  max: 100,
							  maxTicksLimit: 5
						  },
						  gridLines: {
							  display: true
						  }
					  }
				  ]
			  },
			  legend: {
				  display: false
			  }
		  }
	//   });

		})
	// } // end loop
		 
		});

});


$('#btnTripRpm.dropdown-item').on('click', function() {
	var db = firebase.database();
	var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData');
		var tripDateList=[];
		var sumSpeed=0;
	tripDateRef.on("value", function(snap) {
		snap.forEach(function(childNodes){
			tripDateList.push(childNodes.key);
		})
		//outer loop it loops until trip ends
		// var aveSpeedList=[];
		var aveRpmList=[];
		
		for(var i=0;i<tripDateList.length;i++){
			// var sumSpeed=0;
		    var sumRpm=0;
			var tripDateRef=db.ref('/Users/CYFfFMSnffRuE9nJzbwogTza2523/TripData/'+tripDateList[i]); 
			tripDateRef.on('value',function(snap){
				//Inner loop calculating average
			  snap.forEach(function(childNodes){
				// var speed=childNodes.val().SPEED;
				var rpm=childNodes.val().RPM;
				// var i = speed.indexOf(" ");  // Gets the first index where a space occours
				var i = rpm.indexOf(" ");  // Gets the first index where a space occours
				// sumSpeed = sumSpeed + parseInt(speed.substr(0, i)) || 0;
				// console.log("Speed " +speed +" "+ childNodes.key);
				sumRpm = sumRpm + parseInt(rpm.substr(0, i)) || 0;
				// console.log("RPM " +rpm +" "+ childNodes.key);
			  })
			//   let finalSumSpeed=Math.round(sumSpeed / snap.numChildren());
			//   aveSpeedList.push(Math.round(sumSpeed / snap.numChildren()));
			  aveRpmList.push(Math.round(sumRpm / snap.numChildren()));
			//   console.log("Number off "+snap.numChildren())
			//   console.log("Average Speed "+aveSpeedList)
			//   console.log("Average RPM "+aveRpmList)
			});//end snapshot
			 
		}

	
		  
		  var ctx = document.getElementById('myBarChart');
	  var myLineChart = new Chart(ctx, {
		  type: 'bar',
		  data: {
			  labels: tripDateList,
			  datasets: [
				  {
					  label: 'Total:',
					  backgroundColor: 'rgba(2,117,216,1)',
					  borderColor: 'rgba(2,117,216,1)',
					  data: aveRpmList
				  }
			  ]
		  },
		  options: {
			  scales: {
				  xAxes: [
					  {
						  time: {
							  unit: 'month'
						  },
						  gridLines: {
							  display: false
						  },
						  ticks: {
							  maxTicksLimit: 6
						  }
					  }
				  ],
				  yAxes: [
					  {
						  ticks: {
							  min: 0,
							  max: 8000,
							  maxTicksLimit: 5
						  },
						  gridLines: {
							  display: true
						  }
					  }
				  ]
			  },
			  legend: {
				  display: false
			  }
		  }
	//   });

		})
	// } // end loop
		 
		});

});

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
	'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
 
$(document).ready(function() {

	  var user_Id="TG0lqZKsT1S4RY6G71rzMGmuYgw2";
		var db = firebase.database();
		var Trip4Ref = db.ref('/Users/TG0lqZKsT1S4RY6G71rzMGmuYgw2/TripData/Trip4/');
		// var userRef = db.child('Users').child('TG0lqZKsT1S4RY6G71rzMGmuYgw2').child('TripData')
		// .child('Trip1').child('Time100');
		// alert(Trip4Ref);
		var totalFinalRpm=0.0;
		var totalSpeed;
		var totalFinalTime=0.0;
		var totalFuelLevel;
		var time;
		var rpm;
		var finalTime;
		var finalRpm;

		// Trip4Ref.on('value', function(snapshot) {
		// var data = JSON.stringify(snapshot.val);
		// snapshot.forEach(function(childNodes){
		// 	 childNodes.key;
		//      childNodes.val();
		// 	//  console.log(childNodes.key);
		// 	// totalSpeed=totalRpm+childNodes.val().Speed;
		// 	 time=childNodes.val().Time;
		// 	 var index = time.indexOf(" ");  // Gets the first index where a space occours
		// 	finalTime = parseFloat(time.substr(0, index)); // Gets the first part
		// 	rpm=childNodes.val().RPM;
		// 	finalRpm = parseFloat(rpm.substr(0, index)); // Gets the first part
		// 	console.log(finalTime);
		// 	console.log(finalRpm);
		// 	totalFinalTime += finalTime;
		// 	totalFinalRpm += finalRpm;

		// })
		// console.log("Time:" +parseFloat(totalFinalTime).toFixed(2));
		// console.log("RPM:" +parseFloat(totalFinalRpm).toFixed(2));
 

		var ctx = document.getElementById('myBarChart');
		var myLineChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [ 'Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5', 'Trip 6' ],
				datasets: [
					{
						label: 'Total:',
						backgroundColor: 'rgba(2,117,216,1)',
						borderColor: 'rgba(2,117,216,1)',
						data: [parseFloat(totalFinalRpm).toFixed(2), 5312, 6251, 7841, 9821, 14984 ]
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
								max: 15000,
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
		});
	});
// });


$('#btn-trip1-6').click(function(event) {
	var user_Id="TG0lqZKsT1S4RY6G71rzMGmuYgw2";
	var db = firebase.database();
	var Trip4Ref = db.ref('/Users/TG0lqZKsT1S4RY6G71rzMGmuYgw2/TripData/Trip4/');
 
		var totalFinalRpm=0.0;
		var totalSpeed;
		var totalFinalTime=0.0;
		var totalFuelLevel;
		var time;
		var rpm;
		var finalTime;
        var finalRpm;
    
		Trip4Ref.on('value', function(snapshot) {
			snapshot.forEach(function(childNodes){
			  childNodes.key;
				childNodes.val();
			 //  console.log(childNodes.key);
			 // totalSpeed=totalRpm+childNodes.val().Speed;
			  time=childNodes.val().Time;
			  var index = time.indexOf(" ");  // Gets the first index where a space occours
			 finalTime = parseFloat(time.substr(0, index)); // Gets the first part
			 rpm=childNodes.val().RPM;
			 finalRpm = parseFloat(rpm.substr(0, index)); // Gets the first part
			 console.log(finalTime);
			 console.log(finalRpm);
			 totalFinalTime += finalTime;
			 totalFinalRpm += finalRpm;
	   
		   })
	  
		   console.log("Time:" +parseFloat(totalFinalTime).toFixed(2));
		  console.log("RPM:" +parseFloat(totalFinalRpm).toFixed(2));
		var ctx = document.getElementById('myBarChart');
		var myLineChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [ 'Trip 11', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5', 'Trip 6' ],
				datasets: [
					{
						label: 'Total:',
						backgroundColor: 'rgba(2,117,216,1)',
						borderColor: 'rgba(2,117,216,1)',
						data: [ 4215, 5312, 6251, 7841, 9821, 14984 ]
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
								max: 15000,
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
		});
	});
});

// $(".dropdown-menu li a").click(function(){
// 	var parent = $(this).parents(".dropdown").find('.btn btn-light border solid dropdown-toggle');
// 	parent.text($(this).text().trim());
// 	parent.val($(this).data('value'));
// 	alert(parent.val($(this).data('value')));
// 	console.log(parent.text($(this).text().trim()))
// });

$("a#btnTripDate.dropdown-item").click(function(){
	 var trip=$(this).text();
	// var parent = $(this).parents(".dropdown").find('.btn btn-light border solid dropdown-toggle');
	// parent.text($(this).text().trim());
	// parent.val($(this).data('value'));
	// alert(parent.val($(this).data('value')));
	// console.log(parent.text($(this).innerText()));
	console.log(trip);
});
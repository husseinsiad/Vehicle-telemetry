// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


$(document).ready(function () {

  const firebaseConfig = {
    apiKey: "AIzaSyC8ek2z-3xDI8rlaePQiOw-NDByJI8JqZ4",
    authDomain: "se491-5f60f.firebaseapp.com",
    databaseURL: "https://se491-5f60f.firebaseio.com",
    projectId: "se491-5f60f",
    storageBucket: "se491-5f60f.appspot.com",
    messagingSenderId: "541695700970",
    appId: "1:541695700970:web:1438c4a2ac47ea4fe4cc93",
    measurementId: "G-08J4E1H1P2"
  };

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
 
     $('#btn-trip1-6').click(function (event) {
    
      var db=firebase.database();
      var userRef=db.ref("/Users/"+"CYFfFMSnffRuE9nJzbwogTza2523"+"/DTC/DTC Code");
      userRef.on("value",function(snapshot){
       var data=JSON.stringify(snapshot.val)
       var testData = snapshot.val()
       testData = testData.substr(2,testData.length - 4)
       testData = testData.split('), (')
       var testDTC = testData[0].split(', ')
      //  alert(testDTC);
        //  res.render("blank",{ code_num:testDTC[0], data:testDTC[1] });

        var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [testDTC[1], "Trip 2", "Trip 3", "Trip 4", "Trip 5", "Trip 6"],
    datasets: [{
      label: "Total:",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
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
      var db=firebase.database();
      var userRef=db.ref("/Users/"+"CYFfFMSnffRuE9nJzbwogTza2523"+"/DTC/DTC Code");
      userRef.on("value",function(snapshot){
       var data=JSON.stringify(snapshot.val)
       var testData = snapshot.val()
       testData = testData.substr(2,testData.length - 4)
       testData = testData.split('), (')
       var testDTC = testData[0].split(', ')
      //  alert(testDTC);
        //  res.render("blank",{ code_num:testDTC[0], data:testDTC[1] });

        var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [testDTC[0], "Trip 2", "Trip 3", "Trip 4", "Trip 5", "Trip 6"],
    datasets: [{
      label: "Total:",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
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
 




 
           // connect Firebase
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

  var db = firebase.database();

    var latList=[];
    var lotList=[];
    var speedList=[];
    var lat=0;
    var lon=0;
    var dataSource=[];
   
    
    var tripRef=db.ref('/Users/BvbqNMlfdbTw537WJYUDWYxfHIy1/TripData/Trip 04-22-2020 13:16:20'); 
    tripRef.on('value',function(snap){
      snap.forEach(function(childNodes){
        lat=childNodes.val().lat;
        lon=childNodes.val().lon;
        speed=childNodes.val().SPEED; 
        dataSource.push([lat,lon]);
        latList.push(lat);
        //  lotList.push(lon);
        
      })
      var arrLatLng=[];
      var result=[];
      for(var i=0;i<dataSource.length;i++){
        arrLatLng.push("new google.maps.LatLng("+dataSource[i][0] +","+dataSource[i][1]+")");
         
      }
      // console.log(arrLatLng);
      result= JSON.stringify(arrLatLng);
        result=result.replace("[","");
        result=result.replace("]","");
        result=result.replace(/"/g,"");
        // result=result.replace('"',"");
         console.log(result);

    });

    var map, heatmap;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 45.3494155, lng: -93.282987833},
        mapTypeId: 'satellite'
      });
    
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
      });
    }
    
    function toggleHeatmap() {
      heatmap.setMap(heatmap.getMap() ? null : map);
    }
    
    function changeGradient() {
      var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
      heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }
    
    function changeRadius() {
      heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }
    
    function changeOpacity() {
      heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }
   
    // Heatmap data: 500 Points
    function getPoints() {
      return [
     new google.maps.LatLng(45.391982833,-93.367101333),new google.maps.LatLng(45.391982833,-93.367101333),new google.maps.LatLng(45.391982833,-93.367101333),new google.maps.LatLng(45.391982833,-93.367101333),
       
      ];
    }

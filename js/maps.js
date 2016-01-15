var map;
function initialize() {
	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(37.79168, -122.41875),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	this.map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

}

google.maps.event.addDomListener(window, 'load', initialize);


function addEarthquakes() {
	var centerLat = document.getElementById("latitude").value;
	var centerLong = document.getElementById("longitude").value;

	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(centerLat, centerLong),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);


	google.maps.event.addDomListener(window, 'load', initialize);

	request = 'http://api.geonames.org/earthquakesJSON?north=' + (parseFloat(centerLat) + 5).toString() + '&south=' + (parseFloat(centerLat) - 5).toString() + '&east=' + (parseFloat(centerLong) + 5).toString()  + '&west=' + (parseFloat(centerLong) - 5).toString() + '&username=brianyee';

	$.getJSON(request, function(data){
		if (data.earthquakes.length > 1){
			var centerLat = document.getElementById("latitude").value;
			var centerLong = document.getElementById("longitude").value;
			var myLatlng = new google.maps.LatLng(centerLat,centerLong);
			var mapOptions = {
				zoom: 6,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			
			var infowindow = null;
			infowindow = new google.maps.InfoWindow({
				content: "holding..."
			});

			for(var i = 0; i < data.earthquakes.length; i++){

				var lat = data.earthquakes[i].lat;
				var lng = data.earthquakes[i].lng;
				var locations = new google.maps.LatLng(lat,lng);
				var contentString = 
				'<div id="content">'+
				'<h1 id="firstHeading" class="firstHeading">'+
				'<h1>Magnitude: ' + data.earthquakes[i].magnitude.toString() + '</h1>' +
				'<div id="bodyContent">' +
				'<p>Date: '+ new Date(data.earthquakes[i].datetime) +'</p>'+ 
				'<p>Depth: '+ data.earthquakes[i].depth +'</p>'+ 
				'</div>'+
				'</div>'+ 
				'</div>';

				var marker = new google.maps.Marker({
					position: locations,
					map: map,
					title: data.earthquakes[i].magnitude.toString(),
					html: contentString
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(this.html);
					infowindow.open(map,this);
				});
			}
		}
	});
}

$(document).ready(function(){
	$('#submit').on('click',function(e){
		e.preventDefault();
		addEarthquakes();
	});

});

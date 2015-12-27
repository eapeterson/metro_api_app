$(function(){

var request = superagent;

/*var location = function (location) {
	
	url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDa4r24A_xrdeDQE3Yr4s5xLOpIc1HLSHM"
}*/

//find stops w/in 1 mile radius
/*var findStop = function(location) {

        var params = {

        	//var lat = //get from googlemaps
			//var lon = //get from googlemaps
            // Request parameters
            "Lat": "38.897357",
            "Lon": "-77.112496",
            "Radius": "3200",
        };

        var stops = //Stops from WMATA list
      
        $.ajax({
            url: "https://api.wmata.com/Bus.svc/json/jStops&" + $.param(params),
           //WHAT IS THIS?
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key","c8b70f91a8cc4a6ab33dfa8844ca9f07");
            },
            type: "GET",
            // Request body---?
            data: stops,
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    
	
	

	var BuildUrl = function (tag) {
		return "https://api.wmata.com/Bus.svc/json/jStops" + lat + lon + radius
	};

	var stop =  $.ajax({
		url: BuildUrl(tag),
		data: request,
		dataType: "json",
		type: "GET",
		})
};*/



//populate dropdown with nearby stops


//submit button chooses stop
$('.submit').on('click', function (event) {

	var picker = $('#stopPicker');
	console.log(picker.val());

})

//function that spits out a stop based on array selection (line 81)
var getStops = function getStops () {
	request
		.get('https://api.wmata.com/Bus.svc/json/jStops')
		.set({api_key: 'c8b70f91a8cc4a6ab33dfa8844ca9f07'})
		.end(function(err, res) {
			if (err || !res.ok) {
				console.log(err || res)
			}
			else {
				var stop = res.body.Stops[2]
				console.log(stop)
				getTimes(stop.StopID)
			}
		});
};

getStops();

//uses StopID to report bus arrival predictions
var getTimes = function (stopID){
	
	request
		.get('https://api.wmata.com/NextBusService.svc/json/jPredictions')
		.query({StopID: stopID})
		.set({api_key: 'c8b70f91a8cc4a6ab33dfa8844ca9f07'})
		.end(function (err, res) {
			if (err || !res.ok) {
				console.log(err || res)
			}
			else {
				console.log(res.body)
			}
		})

};

//.results populates with time until next bus
//.videos populates with clips of given length and -1 minute
var searchTerm = $("#search-term").val();
		getVideos(searchTerm);

function getVideos (searchTerm) {
	
	url = 'https://www.googleapis.com/youtube/v3/search';
	request.
		get(url).
		query({
			q: searchTerm,
			part: 'snippet',
			key: "AIzaSyCHCzbdE7gO6KRa6eAK2CfWCndd2DymORs"
		}).
		end(function(err, res){
			console.log(res.body)
		})

}

function showResults(results){

	var html = "";
	$.each(results, function(index,item){
		var thumb = item.snippet.thumbnails.medium.url
		html += '<p>' + thumb +'</p>';
		console.log(thumb);

	});

	
	$(".videos").html(html);
	console.log(html);
}

//.more repopulates .videos with new batch of videos


});
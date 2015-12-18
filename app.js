$(function(){

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
$('.submit').on('click', '.choice', function (event) {

	console.log('.choice');
	//function that uses selected stop to populate .results
})

//.results populates with time until next bus
var times = function (event){
	var params = {
            // Request parameters
            "StopID": "NUMBER HERE",
        };
      
        $.ajax({
            url: "https://api.wmata.com/NextBusService.svc/json/jPredictions&" + params,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key","c8b70f91a8cc4a6ab33dfa8844ca9f07");
            },
            type: "GET",
            // Request body
            data: "{body}",
        });
        .done(function(data) {
            alert("success");
        });
        .fail(function() {
            alert("error");
        });
};

//.videos populates with clips of given length and -1 minute
var searchTerm = $("#search-term").val();
		getRequest(searchTerm);

function getRequest (time) {
	var params = {
		q: searchTerm,
		part: 'snippet',
		key: "AIzaSyCHCzbdE7gO6KRa6eAK2CfWCndd2DymORs"		
	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(data){
		console.log(data);
    	showResults(data.items);
    });
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


};
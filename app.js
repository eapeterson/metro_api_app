//find stops w/in 1 mile radius
var findStop = function(location) {

        var params = {
            // Request parameters
            "Lat": "{number}",
            "Lon": "{number}",
            "Radius": "3200",
        };
      
        $.ajax({
            url: "https://api.wmata.com/Bus.svc/json/jStops&" + $.param(params),
           //WHAT IS THIS?
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key","c8b70f91a8cc4a6ab33dfa8844ca9f07");
            },
            type: "GET",
            // Request body---?
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    
/*
	var lat = //get from googlemaps
	var lon = //get from googlemaps
	var radius = 3200;

	var BuildUrl = function (tag) {
		return "https://api.wmata.com/Bus.svc/json/jStops" + lat + lon + radius
	};

	var stop =  $.ajax({
		url: BuildUrl(tag),
		data: request,
		dataType: "json",
		type: "GET",
		})*/
});



//populate dropdown with nearby stops


//submit button chooses stop
$('.submit').on('click', '.choice', function (event) {
	//function that uses selected stop to populate .results
})

//.results populates with time until next bus


//.videos populates with clips of given length and -1 minute


//.more repopulates .videos with new batch of videos
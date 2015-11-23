var findStop = function(location) {

	var lat = 
	var lon = 
	var radius = 3200;

	var BuildUrl = function (tag) {
		return "https://api.wmata.com/Bus.svc/json/jStops" + lat + lon + radius
	};

	var stop =  $.ajax({
		url: BuildUrl(tag),
		data: request,
		dataType: "json",
		type: "GET",
		})
}
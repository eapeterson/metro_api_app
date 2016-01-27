$(function(){

var request = superagent;

var waitTime = 8;

var yTDuration = "medium";

var nextPageToken;

var foundVideos = [];


//submit button chooses stop
$('#stop-dropdown-form').on('submit', function (event) {
	event.preventDefault();
	var picker = $('#stopPicker');
	console.log(picker.val());
	var stopID = picker.val();
	getTimes(stopID);

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
				generateStopForm(res.body.Stops)
				
			}
		});
};

getStops();

//function creates dropdown of all metro stops

var generateStopForm = function generateStopForm (stops) {
	var stopOptions = stops.map(function(stop){
		return '<option value= "' + stop.StopID +'">' + stop.Name + '</option>'
	});



	var form = '<select id= "stopPicker" name="stops">' + 
		'<option value="select">Select your station:</option>' + 
		stopOptions.join('') +
	'</select>' +
	'<button type="submit" class="submit">Submit</button>'

	$("#stop-dropdown-form").html(form)
}

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
				console.log(res.body);
				timeResults(res.body.Predictions);
				
			}
		})

};

//.results populates with time until next bus
var timeResults = function (predictions) {
	var dirMin = predictions.map(function(bus){
		console.log(bus.DirectionText);
		console.log(bus.Minutes);
		return '<option value= "' + bus.Minutes +'">'+ bus.DirectionText + " (" + bus.Minutes + " minutes)" +'</option>'
		
	})

	var nextBusesForm = '<select id= "nextBusPicker">' + 
		'<option value="select">Select your bus:</option>' + 
		dirMin.join('') +
	'</select>' +
	'<button type="submit" class="submit">Submit</button>'

	$('.results').html(nextBusesForm);

}


//submit button chooses bus
$('#bus-choice-form').on('submit', function (event) {
	event.preventDefault();
	var picker = $('#nextBusPicker');
	console.log(picker.val());
	var busMinutes = parseInt (picker.val(), 10);
	waitTime = busMinutes;
	foundVideos = [];
	//NAME OF FUNCTION THAT FINDS VIDS HERE(busMinutes);
 	
 	if (busMinutes < 4) {
 		yTDuration = "short"
 	}
 	else if (busMinutes <= 20) {
 		yTDuration = "medium"
 	}
 	else {
 		yTDuration = "long"
 	}
 	getVideos(searchTerm, yTDuration);
})

getVideos(searchTerm, yTDuration);

var searchTerm = $("#search-term").val();

//finds videos based on general time length (short, medium, long)
function getVideos (searchTerm, vidDuration, pageToken) {
	if (!pageToken) {pageToken = ""}
	if (!vidDuration) {vidDuration = "medium"}
	url = 'https://www.googleapis.com/youtube/v3/search';
	request.
		get(url).
		query({
			q: searchTerm,
			part: 'snippet',
			type: "video",
			maxResults: 20,
			videoDuration: vidDuration,
			pageToken: pageToken,
			key: "AIzaSyCHCzbdE7gO6KRa6eAK2CfWCndd2DymORs"
		}).
		end(function(err, res){
			console.log(res.body)
			var list = "";
			var arr = [];
			nextPageToken = res.body.nextPageToken;
			$.each(res.body.items, function(idx, obj){
				arr.push(obj.id.videoId);
			})
			list = arr.join(",");
			betterDetails(list);
		})

}

//takes array of vids found in getVideos and finds their real length in minutes
function betterDetails (idList) {
	url = 'https://www.googleapis.com/youtube/v3/videos';
	request.
		get(url).
		query({
			part: 'contentDetails',
			id: idList,
			key: "AIzaSyCHCzbdE7gO6KRa6eAK2CfWCndd2DymORs"
		}).
		end(function(err, res){
			
			var data = res.body;
			$.each(data.items, function(idx, obj){
				var d = obj.contentDetails.duration
				data.items[idx].minutes = parseInt(d.substring(2,(d.indexOf("M"))), 10)
			})
			console.log(data);
			var filtered = filterVids (data.items, waitTime);
			console.log(filtered);
			foundVideos = foundVideos.concat(filtered);
			if (foundVideos.length >= 6){
				showResults();
				console.log(foundVideos);
			}
			else{getVideos("", yTDuration, nextPageToken);}
			
		})

}

function filterVids (videos, minutes) {
	var maxMinutes = minutes + 2;
	var minMinutes = minutes - 2;
	var arr = $.grep(videos, function(video, idx){
		console.log(minMinutes, maxMinutes, video.minutes);
		console.log((video.minutes <= maxMinutes && video.minutes >= minMinutes));
		return (video.minutes <= maxMinutes && video.minutes >= minMinutes)
	});
	return arr;	
}


function showResults (){

	var url0 = "https://i.ytimg.com/vi/"
	var url1 = 	"/default.jpg"	
	var html = "";
	$.each(foundVideos.slice(0,6), function(index,item){
		var thumb = url0 + item.id + url1
		
		html += '<img src="' + thumb + '" data-vid="' + item.id + '" />';
		console.log(thumb);

	});

	
	$(".videos").html(html);

}

$(".videos").on("click", function (event){
	var el = $(event.target)
	var vid = el.attr("data-vid")
	var url0 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'
	var url1 =  '" frameborder="0" allowfullscreen></iframe>'
	var html = url0 + vid + url1;
	$(".player").html(html);
})

//.more repopulates .videos with new batch of videos
$(".more").on("click", function(event) {

	foundVideos = foundVideos.slice(6);
	if (foundVideos.length >= 6) {
		showResults();
	} 
	else {
		getVideos("", yTDuration, nextPageToken);
	}
})

});
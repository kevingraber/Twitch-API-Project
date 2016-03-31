// var queryURL = 'https://api.twitch.tv/kraken/streams/'
var stream = "";
var queryURL = '';

var streamers = ["FreeCodeCamp", "joinDota", "MLG", "reynad27", "DreamLeague", "GamesDoneQuick", "Arteezy", "brunofin", "OgamingSC2", "comster404"]

// $("#submit").click(function() {
// 	stream = $("#inputBox").val()
// 	queryURL = 'https://api.twitch.tv/kraken/streams/' + stream;
// 	// alert(stream)

// 	$.ajax({url: queryURL, method: 'GET'}).done(function(info) {
// 		console.log(info)

// 		if (info.stream == null) {
// 			$("#content").html("That user is not streaming!")
// 		} else {
// 			$("#content").html(info.stream.channel.display_name + " is currently streaming " + info.stream.channel.status)
// 		}

		
// 	})

// })

for (var i = 0; i < streamers.length; i++) {

	console.log(streamers[i])

	queryURL = "https://api.twitch.tv/kraken/streams/" + streamers[i];

	(function(i){

		var newDiv = $("<div>")
		newDiv.addClass('col-md-12')

		var imgDiv = $('<div>')
		imgDiv.addClass('col-md-4')
		imgDiv.addClass('text-right')

		var otherDiv = $('<div>')
		otherDiv.addClass('col-md-8')

		var link = $("<a>")
		link.text(streamers[i])
		link.attr('href', 'https://www.twitch.tv/'+streamers[i])
		link.attr('target', '_blank')
		otherDiv.append(link)


		$.ajax({
			url: queryURL, 
			method: 'GET',
			error: function(jqXHR, textStatus, errorThrown){

				

				otherDiv.append("<p>Could not find account information for " + streamers[i] + "</p>")
				newDiv.addClass('offline')
				newDiv.append(otherDiv)

				imgDiv.append("<img class='img-circle' src='https://image.freepik.com/free-icon/question-mark-on-a-circular-black-background_318-41916.png'>")
				newDiv.append(imgDiv)
				
				$("#content").append(newDiv)
			}
		}).done(function(info) {

			// var newDiv = $("<div>")

			// newDiv.addClass('col-md-12')

			$.ajax({url: "https://api.twitch.tv/kraken/channels/"+streamers[i], method: 'GET'}).done(function(data) {
				// var imgDiv = $('<div>')
				// imgDiv.addClass('col-md-4')
				// imgDiv.addClass('text-right')
				imgDiv.append("<img class='img-circle' src='" + data.logo + "''>")
				$(newDiv).append(imgDiv)
				// $(newDiv).append("<img class='img-circle' src='" + data.logo + "''>")
			})

			// var otherDiv = $('<div>')
			// otherDiv.addClass('col-md-8')

			// var link = $("<a>")
			// link.text(streamers[i])
			// link.attr('href', 'https://www.twitch.tv/'+streamers[i])
			// link.attr('target', '_blank')
			// otherDiv.append(link)

			if (info.stream == null) {
				otherDiv.append("<p>" + streamers[i] + " is offline!</p>")
				newDiv.addClass('offline')
				newDiv.append(otherDiv)
				$("#content").append(newDiv)
				// newDiv.append("<p>" + streamers[i] + " is offline!</p>")
				// newDiv.addClass("offline")
				// $("#content").append(newDiv)
			} else {
				otherDiv.append("<p>Status: " + info.stream.channel.status + "</p>")
				otherDiv.append("<p>Current Game: " + info.stream.channel.game + "</p>")
				newDiv.append(otherDiv)
				newDiv.addClass("online")
				$("#content").prepend(newDiv)

				// newDiv.append("<p>" + info.stream.channel.display_name + " is currently streaming " + info.stream.channel.status + "</p>")
				// newDiv.append("<p>Current Game: " + info.stream.channel.game + "</p>")
				// newDiv.addClass("online")
				// $("#content").prepend(newDiv)
			}

			// $("#content").append(newDiv)
		})

	})(i);

}

$("#showOnline").click(function() {
	$(".offline").hide();
	$(".online").show();
});

$("#showOffline").click(function() {
	$(".online").hide();
	$(".offline").show();
});

$("#showAll").click(function() {
	$(".online").show();
	$(".offline").show();
});

// $.ajax({url: queryURL, method: 'GET'}).done(function(info) {

// 	console.log(info)

// 	for (var i = 0; i < streamers.length; i++) {

// 		if (info.stream == null) {
// 			$("#content").html("That user is not streaming!")
// 		} else {
// 			$("#content").append(info.stream.channel.display_name + " is currently streaming " + info.stream.channel.status)
// 		}

// 	}
	
// })

	// if (info.stream == null) {
	// 	$("#content").html("That user is not streaming!")
	// } else {
	// 	$("#content").html(info.stream.channel.display_name + " is currently streaming " + info.stream.channel.status)
	// }
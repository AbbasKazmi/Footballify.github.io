console.log('test')

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://v3.football.api-sports.io/fixtures?live=all",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "v3.football.api-sports.io",
		"X-RapidAPI-Key": "e54f3d3972ca8251c1259694b49948de"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
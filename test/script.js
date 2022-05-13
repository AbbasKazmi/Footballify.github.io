console.log('test')

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://v3.football.api-sports.io/fixtures?date=2022-05-13",
	"method": "GET",
	dataType: 'json',
	"headers": {
		"X-RapidAPI-Host": "v3.football.api-sports.io",
		"X-RapidAPI-Key": "e54f3d3972ca8251c1259694b49948de"
	}
};

const arrWant = [395, 344, 349]

$.ajax(settings).done(function (data) {

const newArr = data.response.filter(el => arrWant.includes(el.league.id));
console.log(newArr)
});
   


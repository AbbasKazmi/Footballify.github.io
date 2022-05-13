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

const arrWant = [1, 2, 3, 4, 5, 6, 7, 9, 10, 29, 30, 31, 32, 33, 
	34, 39, 45, 48, 140, 142, 135, 137, 78, 81, 61, 65, 66, 88,
	94, 96, 253, 203, 262, 179, 185, 144, 188, 169, 40, 41, 42,
	43, 235, 207, 218, 141, 136,333, 307, 197, 62, 79, 80, 128, 
	130, 292, 98,101, 103, 106, 113, 119, 283, 71, 73, 265, 239, 211, 89 ]

$.ajax(settings).done(function (data) {
const newArr = data.response.filter(el => arrWant.includes(el.league.id));
newArr.sort(function(newArr, arrWant){  
	return newArr.indexOf(a) - arrWant.indexOf(b);
  });
  console.log(newArr)
});

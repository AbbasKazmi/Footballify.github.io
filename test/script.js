console.log('test')

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://v3.football.api-sports.io/fixtures?date=2022-05-13",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "v3.football.api-sports.io",
		"X-RapidAPI-Key": "e54f3d3972ca8251c1259694b49948de"
	}
};

$.ajax(settings).done(function (response) {
	console.log('made it');

	response.forEach(element => console.log(element));

    const filterById = function() {
		if (response[i].league.id == 395) {
			console.log('league found')
		} else {
			console.log('league not found')
		}
	}


	for(let i=0; i<response.length; i++) {

		const myLeaguesArr=response.filter(filterById)

		if (response[i].league.id==395) {
		console.log("boom")
		}
	}
});


console.log(myLeaguesArr)
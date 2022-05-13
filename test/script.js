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

const filterById = function() {
	if (response[i].league.id == 395) {
		console.log('league wanted')
	} else {
		console.log('league not wanted')
	}
}


$.ajax(settings).done(function (response) {
	const myLeaguesArr=response.filter(filterById)
	//Program reaches this part of the code but does not go into the for loop for whatever reason 
	// for(let i=0; i<response.length; i++) {
	// 	console.log('test')
	// 	const myLeaguesArr=response.filter(filterById)
	// }
});


console.log(myLeaguesArr) //Prints nothing
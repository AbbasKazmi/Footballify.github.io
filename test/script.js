var container = document.querySelector('.parentDiv')

var desiredOrder = [
    1, 2, 3, 4, 5, 6, 7, 9, 10, 29, 30, 31, 32, 33, 34, 39, 45, 48, 140, 142, 135, 137, 78, 81, 61, 65, 66, 88, 94, 96, 253, 203, 262, 179, 185,
    144, 188, 169, 40, 41, 42, 43, 235, 207, 218, 141, 136, 333, 307, 197, 62, 79, 80, 128, 130, 292, 98, 101, 103, 106, 113, 119, 283, 71, 73,
    265, 239, 211, 89,
];

var run = async () => {
    const res = await fetch('https://v3.football.api-sports.io/fixtures?date=2022-05-13', {
        headers: {
            'X-RapidAPI-Host': "v3.football.api-sports.io",
			"X-RapidAPI-Key": "e54f3d3972ca8251c1259694b49948de"
        },
    });

    const json = (await res.json())?.response;

    const ordered = desiredOrder.map((id) => json.find(({ league }) => league?.id === id));

    const filtered = [...new Set(ordered)].filter(item => item !== undefined)

    console.log(filtered);

	for (i = 0; i < filtered.length-1; i++) {
        
		console.log(filtered[i].league.name)
		console.log(filtered[i].teams.home.name, filtered[i].goals.home)
		console.log(filtered[i].teams.away.name, filtered[i].goals.away)


        let parent = document.createElement("div")
        parent.className = 'parentDiv'
      
        let homeTeamName = document.createElement("div")
        homeTeamName.className = 'league'
        homeTeamName.innerHTML = filtered[i].league.name
        parent.appendChild(homeTeamName)
      
        let homeTeamScore = document.createElement("div")
        homeTeamScore.className = 'team1'
        homeTeamScore.innerHTML = filtered[i].teams.home.name
        parent.appendChild(homeTeamScore)

        let awayTeamName = document.createElement("div")
        awayTeamName.className = 'score1'
        awayTeamName.innerHTML = filtered[i].teams.home.name
        parent.appendChild(awayTeamName)

        let awayTeamScore = document.createElement("div")
        awayTeamScore.className = 'team2'
        awayTeamScore.innerHTML = filtered[i].teams.home.name
        parent.appendChild(awayTeamScore)

      
	  }
};

run();

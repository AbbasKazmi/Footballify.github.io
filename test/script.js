var container = document.querySelector('.parentDiv')

var desiredOrder = [
    1, 2, 3, 4, 5, 6, 7, 9, 10, 29, 30, 31, 32, 33, 34, 39, 45, 48, 140, 142, 135, 137, 78, 81, 61, 65, 66, 88, 94, 96, 253, 203, 262, 179, 185,
    144, 188, 169, 40, 41, 42, 43, 235, 207, 218, 141, 136, 333, 307, 197, 62, 79, 80, 128, 130, 292, 98, 101, 103, 106, 113, 119, 283, 71, 73,
    265, 239, 211, 89,
];

var run = async () => {
    const res = await fetch('https://v3.football.api-sports.io/fixtures?date=2022-05-19', {
        headers: {
            'X-RapidAPI-Host': "v3.football.api-sports.io",
			"X-RapidAPI-Key": "e54f3d3972ca8251c1259694b49948de"
        },
    });

    const json = (await res.json())?.response;

    const ordered = desiredOrder.map((id) => json.find(({ league }) => league?.id === id));

    const filtered = ordered.filter(item => item !== undefined)

    console.log(filtered);

	for (i = 0; i < filtered.length-1; i++) {


        let parent = document.createElement("div")
        parent.className = 'parentDiv'
      
        let league = document.createElement("div")
        league.className = 'league'
        league.innerHTML = filtered[i].league.name
        parent.appendChild(league)

        let child1 = document.createElement("div")
        child1.className = 'childDiv'

        let homeTeamName = document.createElement("div")
        homeTeamName.className = 'team1'
        homeTeamName.innerHTML = filtered[i].teams.home.name
        parent.appendChild(homeTeamName)
      
        let homeTeamScore = document.createElement("div")
        homeTeamScore.className = 'score1'
        homeTeamScore.innerHTML = filtered[i].goals.home
        parent.appendChild(homeTeamScore)

        let child2 = document.createElement("div")
        child2.className = 'childDiv'

        let awayTeamName = document.createElement("div")
        awayTeamName.className = 'team2'
        awayTeamName.innerHTML = filtered[i].teams.away.name
        parent.appendChild(awayTeamName)

        let awayTeamScore = document.createElement("div")
        awayTeamScore.className = 'score2'
        awayTeamScore.innerHTML = filtered[i].goals.away
        parent.appendChild(awayTeamScore)

        document.body.appendChild(parent);
      



        //If Home Wins
        if (filtered[i].teams.home.winner == true) {
            homeTeamName.classList.add('winner')
            awayTeamName.classList.add('loser')
            homeTeamScore.classList.add('winner')
            awayTeamScore.classList.add('loser')

	  } else if (filtered[i].teams.away.winner == true) {
          //If Away Wins
            awayTeamName.classList.add('winner')
            homeTeamName.classList.add('loser')
            awayTeamScore.classList.add('winner')
            homeTeamScore.classList.add('loser')
	  } else {
          //Draw
            homeTeamName.classList.add('loser')
            awayTeamName.classList.add('loser')
            homeTeamScore.classList.add('loser')
            awayTeamScore.classList.add('loser')
 }

}     
};

run();

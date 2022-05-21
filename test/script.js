//Order of Leagues
var desiredOrder = [
    1, 2, 3, 4, 5, 6, 7, 9, 10, 29, 30, 31, 32, 33, 34, 39, 45, 48, 140, 142, 135, 137, 78, 81, 61, 65, 66, 88, 94, 96, 253, 203, 262, 179, 185,
    144, 188, 169, 40, 41, 42, 43, 235, 207, 218, 141, 136, 333, 307, 197, 62, 79, 80, 128, 130, 292, 98, 101, 103, 106, 113, 119, 283, 71, 73,
    265, 239, 211, 89,
];

//Derive day based on UTC 
const isoStr = new Date().toISOString().slice(0,10);

//Pull API Data for UTC
var run = async () => {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${isoStr}`, {
        headers: {
            'X-RapidAPI-Host': "v3.football.api-sports.io",
			"X-RapidAPI-Key": "e54f3d3972ca8251c1259694b49948de"
        },
    });

    //Parse JSON
    const json = (await res.json())?.response;
    //Map desiredOrder onto API Call
    const ordered = desiredOrder.map((id) => json.filter(({ league }) => league?.id === id));
    //Remove any Null Values
    const filtered = ordered.filter(e => e.length);

    //arrLeagues created to avoid duplicate leagues
    let arrLeagues = [];

    //Loop through leagues
	for (i = 0; i < filtered.length-1; i++) {
        //Loop through games of Leagues
       for (x=0; x<filtered[i].length;x++){
        //Create Parent Div For Data
        let parent = document.createElement("div")
        parent.className = 'parentDiv'
        
        //League Duplication not allowed
        if (arrLeagues.includes(filtered[i][x].league.name)) {
         console.log(`${filtered[i][x].league.name} skipped`)
        } else {
        arrLeagues.push(filtered[i][x].league.name)

        //League Name + Round
        let league = document.createElement("div")
        league.className = 'league'
        league.innerHTML = filtered[i][x].league.name + `<img class='flag' src=${filtered[i][x].league.flag}>`
        parent.appendChild(league)
        }

        //Home Container
        let child1 = document.createElement("div")
        child1.className = 'childDiv'

        //Game Status
        let gameStatus = document.createElement("div")
        gameStatus.className = 'status'
        gameStatus.innerHTML = filtered[i][x].fixture.status.short
        parent.appendChild(gameStatus)

        //Home Name
        let homeTeamName = document.createElement("div")
        homeTeamName.className = 'team1'
        homeTeamName.innerHTML = filtered[i][x].teams.home.name
        parent.appendChild(homeTeamName)
      
        //Home Score
        let homeTeamScore = document.createElement("div")
        homeTeamScore.className = 'score1'
        if (filtered[i][x].fixture.status.short == 'NS' || 'CANC') {
        homeTeamScore.innerHTML = 0
        homeTeamScore.classList.add('hide')
        } else {
        homeTeamScore.innerHTML = filtered[i][x].goals.home
        }
        parent.appendChild(homeTeamScore)

        //Away Container
        let child2 = document.createElement("div")
        child2.className = 'childDiv'

        //Away Name
        let awayTeamName = document.createElement("div")
        awayTeamName.className = 'team2'
        awayTeamName.innerHTML = filtered[i][x].teams.away.name
        parent.appendChild(awayTeamName)

        //Away Score
        let awayTeamScore = document.createElement("div")
        awayTeamScore.className = 'score2'
        if (filtered[i][x].fixture.status.short == 'NS' || 'CANC') {
        awayTeamScore.innerHTML = 0
        awayTeamScore.classList.add('hide')
        } else {
        awayTeamScore.innerHTML = filtered[i][x].goals.away
        }
        parent.appendChild(awayTeamScore)

        //Push all Data to DOM
        
        document.querySelector('.parentContainer').appendChild(parent);
      



        //If Home Wins
        if (filtered[i][x].teams.home.winner == true) {
            homeTeamName.classList.add('winner')
            awayTeamName.classList.add('loser')
            homeTeamScore.classList.add('winner')
            awayTeamScore.classList.add('loser')

	  } else if (filtered[i][x].teams.away.winner == true) {
          //If Away Wins
            awayTeamName.classList.add('winner')
            homeTeamName.classList.add('loser')
            awayTeamScore.classList.add('winner')
            homeTeamScore.classList.add('loser')
          //Match Not Started or  Cancelled
	  } else if (filtered[i][x].fixture.status.short == 'NS' || 'CANC'){
        homeTeamName.classList.add('winner')
        homeTeamScore.classList.add('winner')
        awayTeamScore.classList.add('winner')
        awayTeamName.classList.add('winner')

      } else {
          //Draw
            homeTeamName.classList.add('loser')
            awayTeamName.classList.add('loser')
            homeTeamScore.classList.add('loser')
            awayTeamScore.classList.add('loser')
        }



    }
  }     
};

//Run Json
run();

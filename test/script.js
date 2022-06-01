

//Order of Leagues
var desiredOrder = [
    1, 2, 3, 848, 4, 5, 6, 7, 9, 10, 29, 30, 31, 32, 33, 34, 39, 45, 48, 140, 142, 135, 137, 78, 81, 61, 65, 66, 88, 94, 96, 253, 203, 262, 179, 185,
    144, 188, 169, 11, 13, 40, 41, 42, 43, 235, 207, 218, 141, 136, 333, 307, 197, 62, 79, 80, 128, 130, 292, 98, 101, 103, 106, 113, 119, 283, 71, 73,
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
    console.log(filtered)
    //Loop through leagues
    $('.parentDiv').remove();
	for (i = 0; i < filtered.length-1; i++) {
       //Loop through games of Leagues
       for (x=0; x<filtered[i].length;x++){
        //Create Parent Div For Data
        let parent = document.createElement("div")
        parent.className = 'parentDiv'
        
        //League Duplication not allowed
        if (arrLeagues.includes(filtered[i][x].league.id)) {

        } else {
        arrLeagues.push(filtered[i][x].league.id)

        //League Name
        let league = document.createElement("div")
        league.className = 'league'

        if (filtered[i][x].league.flag) {
        league.innerHTML = filtered[i][x].league.name + `<img class='flag' src=${filtered[i][x].league.flag}>`
        } else {
        league.innerHTML = filtered[i][x].league.name + `<img class='flag' src=${filtered[i][x].league.logo}>`  
        }
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
      
        let timerOrigin = document.createElement("div")
        timerOrigin.className = 'timer'
        timerOrigin.innerHTML = filtered[i][x].fixture.timestamp;

        let venue = document.createElement("div")
        venue.className = 'venue'
        venue.innerHTML = filtered[i][x].fixture.venue.name;

        let city = document.createElement("div")
        city.className = 'city'
        city.innerHTML = filtered[i][x].fixture.venue.city;

        let referee = document.createElement("div")
        referee.className = 'referee'
        referee.innerHTML = filtered[i][x].fixture.referee;

        let fixtureId = document.createElement("div")
        fixtureId.className = 'fixtureId'
        fixtureId.innerHTML = filtered[i][x].fixture.id;

        let country = document.createElement("div")
        country.className = 'country'
        country.innerHTML = filtered[i][x].league.country;

        let homeTeamLogo = document.createElement("img")
        homeTeamLogo.className = 'logo1'
        homeTeamLogo.setAttribute("src",filtered[i][x].teams.home.logo)

        let awayTeamLogo = document.createElement("img")
        awayTeamLogo.className = 'logo1'
        awayTeamLogo.setAttribute("src",filtered[i][x].teams.away.logo)

        //Home Score
        let homeTeamScore = document.createElement("div")
        homeTeamScore.className = 'score1'
        
        
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

        parent.appendChild(awayTeamScore)
        //Push all Data to DOM

        var runLineups = async (idParameter) => {
            const lin = await fetch(`https://v3.football.api-sports.io/fixtures/lineups?fixture=${idParameter}`, {
        headers: {
            'X-RapidAPI-Host': 'v3.football.api-sports.io',
            'X-RapidAPI-Key': 'e54f3d3972ca8251c1259694b49948de'
        },
        });
        const lineupData = (await lin.json())?.response;
        console.log(lineupData)

        $('lineupC').remove();
        let lineupC = document.createElement('div')
        lineupC.className='lineupC';

        let textstart11 = document.createElement('div')
        textstart11.className = 'startEleven'

        //Starting 11

        if (lineupData.length===0) {
            textstart11.innerHTML = 'Lineups Not Available'
            document.querySelector('.sideScoreDiv').appendChild(textstart11)
            $(textstart11).hide().fadeIn(500);
        } else {

            if (lineupData[0].formation) {
            textstart11.innerHTML = 'Starting XI'
            document.querySelector('.sideScoreDiv').appendChild(textstart11)
            $(textstart11).hide().fadeIn(500);
    
            for (let d=0; d<=lineupData[0].startXI.length-1; d++) {
                
                let lineupParentHome = document.createElement('div')
                lineupParentHome.classList = "lineupParentHome"
                lineupParentHome.innerHTML=lineupData[0].startXI[d].player.name
                document.querySelector('.sideScoreDiv').appendChild(lineupParentHome)
                lineupC.appendChild(lineupParentHome)
                $(lineupParentHome).hide().fadeIn(500);
               
                let lineupParentAway = document.createElement('div')
                lineupParentAway.classList = "lineupParentAway"
                lineupParentAway.innerHTML=lineupData[1].startXI[d].player.name
                lineupC.appendChild(lineupParentAway)
                $(lineupParentAway).hide().fadeIn(500);
                }

                let substitutes = document.createElement('div')
                substitutes.className = 'startEleven'
                substitutes.innerHTML="Substitutes"
                document.querySelector('.sideScoreDiv').appendChild(substitutes)

            for (let d=0; d<=lineupData[0].substitutes.length-1; d++) {
                
    
                let subsHome = document.createElement('div')
                subsHome.classList = "lineupParentHome"
                subsHome.innerHTML=lineupData[0].substitutes[d].player.name
                document.querySelector('.sideScoreDiv').appendChild(subsHome)
                lineupC.appendChild(subsHome)
                $(subsHome).hide().fadeIn(500);
                
                if (lineupData[1].substitutes.length-1>=d) {
                let subsAway = document.createElement('div')
                subsAway.classList = "lineupParentAway"
                subsAway.innerHTML=lineupData[1].substitutes[d].player.name
                lineupC.appendChild(subsAway)
                $(subsAway).hide().fadeIn(500);
                }

            }
            } else {
            textstart11.innerHTML = 'Lineups Not Available'
            document.querySelector('.sideScoreDiv').appendChild(textstart11)
            $(textstart11).hide().fadeIn(500);

        }

    }

    

    document.querySelector('.sideScoreDiv').appendChild(lineupC)
    }

    var runStats = async (idParameter) => {
        const stats = await fetch(`https://v3.football.api-sports.io/fixtures/lineups?fixture=${idParameter}`, {
    headers: {
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
        'X-RapidAPI-Key': 'e54f3d3972ca8251c1259694b49948de'
    },
    })
    const statsData = (await stats.json())?.response;
    console.log(statsData)
};
    
                //Match Not Started or  Cancelled/Postponed or In Progress
    if (gameStatus.innerHTML == 'TBD' || gameStatus.innerHTML == 'PST' || gameStatus.innerHTML == 'NS' || gameStatus.innerHTML == '1H' || gameStatus.innerHTML == '2H' || gameStatus.innerHTML == 'ET' || gameStatus.innerHTML == 'INT' || gameStatus.innerHTML == 'HT' ){
                 
                                                               homeTeamName.classList.add('winner')
                                                               homeTeamScore.classList.add('winner')
                                                               awayTeamScore.classList.add('winner')
                                                               awayTeamName.classList.add('winner')

        //If Home Wins
        } else if (filtered[i][x].teams.home.winner == true) { homeTeamName.classList.add('winner') 
                                                               awayTeamName.classList.add('loser')
                                                               homeTeamScore.classList.add('winner')
                                                               awayTeamScore.classList.add('loser')

	    } else if (filtered[i][x].teams.away.winner == true) {
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

        if (String(filtered[i][x].fixture.status.short) === 'NS') {
            homeTeamScore.innerHTML = 0
            homeTeamScore.classList.add('hide')
            awayTeamScore.innerHTML = 0
            awayTeamScore.classList.add('hide')

        } else if (String(filtered[i][x].fixture.status.short) === 'CANC') {
            homeTeamScore.classList.add('hide')
            homeTeamScore.innerHTML = 0
            awayTeamScore.classList.add('hide')
            awayTeamScore.innerHTML = 0
            gameStatus.innerHTML = 'NA'
        } else if (String(filtered[i][x].fixture.status.short) === 'HT') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.classList.add('live')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.classList.add('live')
            gameStatus.classList.add('live')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
        } else if (String(filtered[i][x].fixture.status.short) === 'PEN') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
        } else if (String(filtered[i][x].fixture.status.short) === 'PST') {
            homeTeamScore.classList.add('hide')
            homeTeamScore.innerHTML = 0
            awayTeamScore.classList.add('hide')
            awayTeamScore.innerHTML = 0
        } else if (String(filtered[i][x].fixture.status.short) === 'TBD') {
            homeTeamScore.classList.add('hide')
            homeTeamScore.innerHTML = 0//filtered[i][x].goals.home
            awayTeamScore.classList.add('hide')
            awayTeamScore.innerHTML = 0//filtered[i][x].goals.away
        } else if (String(filtered[i][x].fixture.status.short) === 'FT') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
        } else if (String(filtered[i][x].fixture.status.short) === 'AET') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
        } else if (String(filtered[i][x].fixture.status.short) === 'INT') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.classList.add('live')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.classList.add('live')
            gameStatus.classList.add('live')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
        } else if (String(filtered[i][x].fixture.status.short) == '1H') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.classList.add('live')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.classList.add('live')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
            gameStatus.classList.add('live')
            gameStatus.innerHTML = filtered[i][x].fixture.status.elapsed + "′"
        } else if (String(filtered[i][x].fixture.status.short) == 'ET') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.classList.add('live')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.classList.add('live')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
            gameStatus.classList.add('live')
            gameStatus.innerHTML = filtered[i][x].fixture.status.elapsed + "′"
        } else if (String(filtered[i][x].fixture.status.short) == '2H') {
            homeTeamScore.classList.remove('hide')
            homeTeamScore.classList.add('live')
            homeTeamScore.innerHTML = filtered[i][x].goals.home
            awayTeamScore.classList.remove('hide')
            awayTeamScore.classList.add('live')
            awayTeamScore.innerHTML = filtered[i][x].goals.away
            gameStatus.classList.add('live')
            gameStatus.innerHTML = filtered[i][x].fixture.status.elapsed + "′"

        } else {}

        parent.addEventListener("click", function(){
                $('.navbarMini').remove()
                $('.rightDiv').remove();      
                $('.rightDivScores').remove();
                $('.venue').remove();
                $('.city').remove();
                $('.referee').remove();
                $('.lineupC').remove();
                $('.lineupParentHome').remove();
                $('.lineupParentAway').remove();
                $('.startEleven').remove();
                $('.fixtureInfo').remove();


           

            let teamNames = document.createElement("div")
            teamNames.className = 'rightDiv'

            let fixtureId2 = document.createElement("div")
            fixtureId2.className = 'fixtureId2'                                                         //
            fixtureId2.innerHTML = fixtureId.innerHTML;

            let homeTeamNameRightDiv = document.createElement("div")
            homeTeamNameRightDiv.className = 'fixturel'
            homeTeamNameRightDiv.innerHTML = homeTeamName.innerHTML + "-" 
            teamNames.appendChild(homeTeamNameRightDiv)

            let awayTeamNameRightDiv = document.createElement("div")
            awayTeamNameRightDiv.className = 'fixturer'
            awayTeamNameRightDiv.innerHTML = awayTeamName.innerHTML
            teamNames.appendChild(awayTeamNameRightDiv)

            let sideScore = document.createElement("div")
            sideScore.className = 'rightDivScores'

            let homeTeamLogoRightDiv = document.createElement("img")
            homeTeamLogoRightDiv.className = 'logo1'
            homeTeamLogoRightDiv.setAttribute("src", homeTeamLogo.getAttribute("src"))
            sideScore.appendChild(homeTeamLogoRightDiv)

            let timer = document.createElement("div")
            timer.className = 'timer'
            // Update the count down every 1 second
            var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();
  
            // Find the distance between now and the count down date
            var distance = Number(String(timerOrigin.innerHTML)+"000") - now;
  
            // Time calculations for days, hours, minutes and seconds

            //Days are not displayed, only used to help calculate hours
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));


            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24);
            if (String(hours).length == 1) {
                hours= "0" + hours;
            }


            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            if (String(minutes).length == 1) {
                minutes= "0" + minutes;
            }


            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (String(seconds).length == 1) {
                seconds = "0" + seconds;
            }
                
            // Display the time
            if (Number(seconds)>=0){
            timer.innerHTML = hours + ":" + minutes + ":" + seconds;
            } else {
                if (gameStatus.innerHTML=="NS" || gameStatus.innerHTML=="TBD" || gameStatus.innerHTML=="NA" || gameStatus.innerHTML=="PST") {
                timer.innerHTML="-";
                } else if (distance < 0) {
                    let homeTeamScoreRightDiv = document.createElement("div")
                    homeTeamScoreRightDiv.className = 'fixtureScoreRight'
                    homeTeamScoreRightDiv.innerHTML = homeTeamScore.innerHTML + "-" 
        
                    let awayTeamScoreRightDiv = document.createElement("div")
                    awayTeamScoreRightDiv.className = 'fixtureScoreLeft'
                    awayTeamScoreRightDiv.innerHTML = awayTeamScore.innerHTML
                    if (gameStatus.innerHTML=="FT" || gameStatus.innerHTML=="AWD") {
                        timer.innerHTML= homeTeamScoreRightDiv.innerHTML + awayTeamScoreRightDiv.innerHTML;   
                        timer.classList.remove('live') 
                    } else {
                        timer.innerHTML= homeTeamScoreRightDiv.innerHTML + awayTeamScoreRightDiv.innerHTML;   
                        timer.classList.add('live')
                  }
                }
            }
  
            // If the count down is finished, Display score
        
        }, .005);
            sideScore.appendChild(timer)

            let awayTeamLogoRightDiv = document.createElement("img")
            awayTeamLogoRightDiv.className = 'logo1'
            awayTeamLogoRightDiv.setAttribute("src", awayTeamLogo.getAttribute("src"))
            sideScore.appendChild(awayTeamLogoRightDiv)

            

            console.log(`${awayTeamName.innerHTML} Has Been Clicked`)


            document.querySelector('.sideScoreDiv').appendChild(teamNames)
            document.querySelector('.sideScoreDiv').appendChild(sideScore)

            
            $('.venue').remove();
            $('.city').remove();
            $('.referee').remove();
            $('.lineupC').remove();
            $('.lineupParentHome').remove();
            $('.lineupParentAway').remove();
            $('.startEleven').remove();
            $('.fixtureInfo').remove();



            let navbarMini = document.createElement('nav')
            navbarMini.className='navbarMini';

            let eventsButton = document.createElement('button')
            eventsButton.className = 'eventsButton'
            eventsButton.innerHTML = "Events"
            navbarMini.appendChild(eventsButton)
            eventsButton.addEventListener("click", function(){ 
                eventsButton.classList.add("clicked")
                statsButton.classList.remove("clicked")
                infoButton.classList.remove("clicked")
                lineupButton.classList.remove("clicked")

            $('.venue').remove();
            $('.city').remove();
            $('.referee').remove();
            $('.lineupC').remove();
            $('.lineupParentHome').remove();
            $('.lineupParentAway').remove();
            $('.startEleven').remove();
            $('.fixtureInfo').remove();

            }) 

            let statsButton=document.createElement('button')
            statsButton.className='statsButton';
            statsButton.innerHTML='Statistics'
            navbarMini.appendChild(statsButton);
            statsButton.addEventListener("click", function(){ 
                statsButton.classList.add("clicked")
                infoButton.classList.remove("clicked")
                eventsButton.classList.remove("clicked")
                lineupButton.classList.remove("clicked")

            $('.venue').remove();
            $('.city').remove();
            $('.referee').remove();
            $('.lineupC').remove();
            $('.lineupParentHome').remove();
            $('.lineupParentAway').remove();
            $('.startEleven').remove();     
            $('.fixtureInfo').remove();

            runStats(fixtureId.innerHTML);

            }) 

            let lineupButton=document.createElement('button')
            lineupButton.className='lineupButton';
            lineupButton.innerHTML="Lineups"
            navbarMini.appendChild(lineupButton)
            lineupButton.addEventListener("click", function(){ 
            
            $('.venue').remove();
            $('.city').remove();
            $('.referee').remove();
            $('.lineupC').remove();
            $('.lineupParentHome').remove();
            $('.lineupParentAway').remove();
            $('.startEleven').remove();
            $('.fixtureInfo').remove();


                lineupButton.classList.add("clicked")
                infoButton.classList.remove("clicked")
                eventsButton.classList.remove("clicked")
                statsButton.classList.remove("clicked")

                

                // while (gameStatus != "FT" && Number(timer.innerHTML.slice(1,2))<=0) {
                    runLineups(fixtureId.innerHTML);
    });



            let infoButton=document.createElement('button')
            infoButton.classList='infoButton'
            infoButton.innerHTML='Info  '
            infoButton.addEventListener("click", function(){ 
                infoButton.classList.add("clicked")
                statsButton.classList.remove("clicked")
                eventsButton.classList.remove("clicked")
                lineupButton.classList.remove("clicked")

            $('.venue').remove();
            $('.city').remove();
            $('.referee').remove();
            $('.lineupC').remove();
            $('.lineupParentHome').remove();
            $('.lineupParentAway').remove();
            $('.startEleven').remove();
            $('.fixtureInfo').remove();

                let infoText = document.createElement('div')
                infoText.className = 'fixtureInfo'
                infoText.innerHTML = 'Information'
                document.querySelector('.sideScoreDiv').appendChild(infoText)
                $(infoText).hide().fadeIn(1000);

                let venueOnClick=document.createElement('Div')
                venueOnClick.classList='venue'
                venueOnClick.innerHTML=`Venue: ${venue.innerHTML}`
                document.querySelector('.sideScoreDiv').appendChild(venueOnClick)
                $(venueOnClick).hide().fadeIn(1000);

                
                let refereeOnClick=document.createElement('Div')
                refereeOnClick.classList='referee'
                refereeOnClick.innerHTML=`Referee: ${referee.innerHTML}`
                document.querySelector('.sideScoreDiv').appendChild(refereeOnClick)
                $(refereeOnClick).hide().fadeIn(1000);

                
                let cityOnClick=document.createElement('Div')
                cityOnClick.classList='city'
                cityOnClick.innerHTML=`Location: ${city.innerHTML}, ${country.innerHTML}`
                document.querySelector('.sideScoreDiv').appendChild(cityOnClick)
                $(cityOnClick).hide().fadeIn(1000);

            }) 
            
            navbarMini.appendChild(infoButton)


            document.querySelector('.sideScoreDiv').appendChild(navbarMini)
           

        })

        

        document.querySelector('.parentContainer').appendChild(parent);


    }
  }     

};


//Run Page
run();

//Refresh Data
const interval = setInterval(function() {
    run();
  }, 60000);

//Page Load Delay
$( document ).ready(function() {
    console.log('page loaded')
    setTimeout(function () {
        document.querySelector(".hideThis").style.visibility = "visible"
    }, 1000);
});
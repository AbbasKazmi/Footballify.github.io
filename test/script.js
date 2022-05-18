var container = document.querySelector('.parentDiv')

var desiredOrder = [
    1, 2, 3, 4, 5, 6, 7, 9, 10, 29, 30, 31, 32, 33, 34, 39, 45, 48, 140, 142, 135, 137, 78, 81, 61, 65, 66, 88, 94, 96, 253, 203, 262, 179, 185,
    144, 188, 169, 40, 41, 42, 43, 235, 207, 218, 141, 136, 333, 307, 197, 62, 79, 80, 128, 130, 292, 98, 101, 103, 106, 113, 119, 283, 71, 73,
    265, 239, 211, 89,
];

const run = async () => {
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

    $(document).ready(
    filtered.forEach(function(element) {
        container.append('<div>' + element.league.name + '</div>');
        container.append('<div>' + element.teams.home.name + '</div>');
        container.append('<div>' + element.goals.home + '</div>');
        container.append('<div>' + element.teams.away.name + '</div>');
        container.append('<div>' + element.goals.away + '</div>');

        console.log('For Each Calls')
        console.log(filtered[i].league.name)
		console.log(filtered[i].teams.home.name, filtered[i].goals.home)
		console.log(filtered[i].teams.away.name, filtered[i].goals.away)

    }));

	for (i = 0; i < filtered.length-1; i++) {
        
        console.log('For Calls')
		console.log(filtered[i].league.name)
		console.log(filtered[i].teams.home.name, filtered[i].goals.home)
		console.log(filtered[i].teams.away.name, filtered[i].goals.away)

	  }
};

run();

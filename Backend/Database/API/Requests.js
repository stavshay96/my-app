const axios = require('axios');
const Player = require('../../Classes/Info/Player');
const Team = require('../../Classes/Info/Team');
const League = require('../../Classes/Info/League');
const path = require("path");
const DBManager = require(path.join(
    __dirname,
    "../DBManager"
));

let config = {
    method: 'get',
    url: 'http://api.football-data.org/v4/competitions/PL/teams',
    headers: {
        'X-Auth-Token': 'ae8e44252c794be0bac8932ad4e29edd'
    }
};

axios(config)
    .then(function(response) {
        let league_full_data = JSON.parse(JSON.stringify(response.data))
        const league=new League(0,"PremierLeague","ליגה אנגלית",[],38)
        league_full_data.teams.forEach(element => {
            const team = new Team(0, element.shortName,"", [])
            element.squad.forEach(p => {
                const player = new Player(0, p.name,"",team.englishName,"", p.position, Array.from({ length: league.numOfGames }, () => 0), 0)
                team.Players.push(player)
            })
            league.TeamsList.push(team)
        })
        DBManager.CreateNewLeagueInDataBase(league)
        console.log("finished")

    })
    .catch(function(error) {
        console.log(error);
    });
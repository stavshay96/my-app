//leagueID
//leagueName
//teamsList
//gameweekList

class League {
    constructor(
        leagueID,
        leagueName,
        teamsList
    ) {
        this.leagueID = leagueID;
        this.leagueName = leagueName;
        this.teamsList = teamsList;
    }
    get LeagueID() {
        return this.leagueID;
    }
    get Name() {
        return this.name;
    }
    get TeamsList() {
        return this.teamsList;
    }

    get GameweekList() {
        return this.gameweekList;
    }


    changeLeagueID(newLeagueID) {
        this.leagueID = newLeagueID;
    }
    changeLeagueName(newLeagueName) {
        this.leagueName = newLeagueName;
    }
    changeTeamsList(newTeamsList) {
        this.teamsList = newTeamsList;
    }

    changeGameweekList(newGameweekList) {
        this.gameweekList = newGameweekList;
    }
}


module.exports = League
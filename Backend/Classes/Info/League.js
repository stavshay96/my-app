//leagueID
//leagueName
//teamsList
//gameweekList

class League {
    constructor(
        leagueID,
        englishleagueName,
        hebrewleagueName,
        teamsList,
        gameweeksList,
        numOfGames
    ) {
        this.leagueID = leagueID;
        this.englishleagueName = englishleagueName;
        this.hebrewleagueName = hebrewleagueName;
        this.teamsList = teamsList;
        this.gameweeksList = gameweeksList;
        this.numOfGames = numOfGames;
    }
    get LeagueID() {
        return this.leagueID;
    }
    get EnglishleagueName() {
        return this.englishleagueName;
    }
    get HebrewleagueName() {
        return this.hebrewleagueName;
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
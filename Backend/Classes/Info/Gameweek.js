//gameWeekNumber
//matchesList

class Gameweek {
    constructor(
        gameweekNumber,
        matchesList
    ) {
        this.gameweekNumber = gameweekNumber;
        this.matchesList = matchesList;
    }
    get GameweekNumber() {
        return this.gameweekNumber;
    }
    get MatchesList() {
        return this.matchesList;
    }

    changeGameweekNumber(newGameweekNumber) {
        this.gameweekNumber = newGameweekNumber;
    }

    changeMatchesList(newMatchesList) {
        this.matchesList = newMatchesList;
    }


}


module.exports = Gameweek
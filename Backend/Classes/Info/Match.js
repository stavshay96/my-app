//matchID
//homeTeamName
//homeTeamScore
//awayTeamName
//awayTeamScore

class Match {
    constructor(
        matchID,
        homeTeamName,
        awayTeamName
    ) {
        this.matchID = matchID;
        this.homeTeamName = homeTeamName;
        this.awayTeamName = awayTeamName;
    }
    get MatchID() {
        return this.matchID;
    }
    get HomeTeamName() {
        return this.homeTeamName;
    }
    get HomeTeamScore() {
        return this.homeTeamScore;
    }
    get AwayTeamName() {
        return this.awayTeamName;
    }
    get AwayTeamScore() {
        return this.awayTeamScore;
    }


    changeMatchID(newMatchID) {
        this.matchID = newMatchID;
    }
    changeHomeTeamName(newHomeTeamName) {
        this.homeTeamName = newHomeTeamName;
    }
    changeHomeTeamScore(newHomeTeamScore) {
        this.homeTeamScore = newHomeTeamScore;
    }

    changeAwayTeamName(newAwayTeamName) {
        this.awayTeamName = newAwayTeamName;
    }
    changeAwayTeamScore(newAwayTeamScore) {
        this.awayTeamScore = newAwayTeamScore;
    }


}


module.exports = Match
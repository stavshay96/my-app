// teamID
// Name
// Players (list)
// isStillCompeting (for champions mostly)


class Team {
    constructor(
        teamID,
        englishName,
        hebrewName,
        players
    ) {
        this.teamID = teamID;
        this.englishName = englishName;
        this.hebrewName = hebrewName;
        this.players = players;
    }
    get TeamID() {
        return this.teamID;
    }
    get EnglishName() {
        return this.englishName;
    }
    get HebrewName() {
        return this.hebrewName;
    }
    get Players() {
        return this.players;
    }

    changeTeamID(newTeamID) {
        this.teamID = newTeamID;
    }
    changeName(newName) {
        this.englishName = newName;
    }
    changePosition(newPosition) {
        this.position = newPosition;
    }
}


module.exports = Team
// teamID
// Name
// Players (list)
// isStillCompeting (for champions mostly)


class Team {
    constructor(
        teamID,
        name,
        players
    ) {
        this.teamID = teamID;
        this.name = name;
        this.players = players;
    }
    get TeamID() {
        return this.teamID;
    }
    get Name() {
        return this.name;
    }
    get Players() {
        return this.players;
    }

    changeTeamID(newTeamID) {
        this.teamID = newTeamID;
    }
    changeName(newName) {
        this.name = newName;
    }
    changePosition(newPosition) {
        this.position = newPosition;
    }
}


module.exports = Team
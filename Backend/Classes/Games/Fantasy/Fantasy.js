//League - info
//FantasyUsers list 
//FantasyRooms list
// DeadlineSubs - dateTime

const rule_points = {
    "Def": { "Goal": 6, "Assist": 3, "Clean Sheet": 4, "Earn Pendel": 2, "YC": -1, "RC": -3, "Cause Pendel": -4, "Miss Penalty": -3 }
}

const pointsOrder = {
    "60+mins": 1,
    "60-mins": 1,
    "Goal": 4,
    "Assist": 3,
    "Earn Pendel": 2,
    "Cause Pendel": -4,
    "Miss Penalty": -3,
    "Save Pendel": 0,
    "Clean Sheet": 0,
    "YC": -1,
    "RC": -3
}

class Fantasy {
    constructor(
        leagueInfo,
        fantasyUsers,
        fantasyRooms,
    ) {
        this.leagueInfo = leagueInfo;
        this.fantasyUsers = fantasyUsers;
        this.fantasyRooms = fantasyRooms;
        this.deadline = new Date();
    }
    get LeagueInfo() {
        return this.leagueInfo;
    }
    get FantasyUsers() {
        return this.fantasyUsers;
    }
    get FantasyRooms() {
        return this.fantasyRooms;
    }

    get Deadline() {
        return this.deadline;
    }


    changeLeagueInfo(newLeagueInfo) {
        this.leagueInfo = newLeagueInfo;
    }
    changeFantasyUsers(newFantasyUsers) {
        this.fantasyUsers = newFantasyUsers;
    }
    changeFantasyRooms(newFantasyRooms) {
        this.fantasyRooms = newFantasyRooms;
    }

    changeDeadline(newDeadline) {
        this.deadline = newDeadline;
    }

    calcPoints(player, currentFixture) {

    }

    CreateFantasyUser(){
        
    }


}


module.exports = Fantasy
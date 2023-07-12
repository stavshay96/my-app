// playerID
// fullName
// Position
// Price
// Points
// statistics(goals, assists, appearences, clean sheet..)

class Player {
    constructor(
        playerID,
        fullName,
        position
    ) {
        this.playerID = playerID;
        this.fullName = fullName;
        this.position = position;
    }
    get PlayerID() {
        return this.playerID;
    }
    get FullName() {
        return this.fullName;
    }
    get Position() {
        return this.position;
    }
    get Price() {
        return this.price;
    }
    get Points() {
        return this.points;
    }
    get Statistics() {
        return this.statistics;
    }

    changePlayerID(newPlayerID) {
        this.playerID = newPlayerID;
    }
    changeFullName(newFullName) {
        this.fullName = newFullName;
    }
    changePosition(newPosition) {
        this.position = newPosition;
    }
    changePrice(newPrice) {
        this.price = newPrice;
    }
    changePoints(newPoints) {
        this.points = newPoints;
    }
    changeStatistics(newStatistics) {
        this.statistics = newStatistics;
    }
}


module.exports = Player
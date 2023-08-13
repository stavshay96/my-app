// playerID
// fullName
// Position
// Price
// Points
// statistics(goals, assists, appearences, clean sheet..)

class Player {
    constructor(
        playerID,
        englishName,
        hebrewName,
        englishTeamName,
        hebrewTeamName,
        position,
        pointsPerWeek,
        totalPoints
    ) {
        this.playerID = playerID;
        this.englishName = englishName;
        this.hebrewName = hebrewName;
        this.englishTeamName = englishTeamName;
        this.hebrewTeamName = hebrewTeamName;
        this.position = position;
        this.pointsPerWeek = pointsPerWeek;
        this.totalPoints = totalPoints;
    }
    get PlayerID() {
        return this.playerID;
    }
    get EnglishName() {
        return this.englishName;
    }
    get HebrewName() {
        return this.hebrewName;
    }
    get EnglishTeamName() {
        return this.englishTeamName;
    }
    get HebrewTeamName() {
        return this.hebrewTeamName;
    }
    get Position() {
        return this.position;
    }
    get Price() {
        return this.price;
    }
    get PointsPerWeek() {
        return this.pointsPerWeek;
    }
    get TotalPoints() {
        return this.totalPoints;
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
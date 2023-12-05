class FantasySettings {
    constructor(
        leagueChoice,
        deadline,
        budgetLimit,
        numOfSubsLimit,
        playersFromSameTeamLimit,
        currentGameweek
    ) {
        this.leagueChoice = leagueChoice;
        this.deadline = deadline;
        this.budgetLimit = budgetLimit;
        this.numOfSubsLimit = numOfSubsLimit;
        this.playersFromSameTeamLimit = playersFromSameTeamLimit;
        this.currentGameweek = currentGameweek;
    }

    get LeagueChoice() {
        return this.leagueChoice;
    }

    get BudgetLimit() {
        return this.budgetLimit;
    }
    get NumOfSubsLimit() {
        return this.numOfSubsLimit;
    }

    get Deadline() {
        return this.deadline;
    }


    changeBudgetLimit(newBudgetLimit) {
        this.budgetLimit = newBudgetLimit;
    }
    changeNumOfSubsLimit(newNumOfSubsLimit) {
        this.numOfSubsLimit = newNumOfSubsLimit;
    }
    changeDeadline(newDeadline) {
        this.deadline = newDeadline;
    }


}


module.exports = FantasySettings
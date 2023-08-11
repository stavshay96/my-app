

class FantasySettings {
    constructor(
        deadline,
        budgetLimit,
        numOfSubsLimit,
    ) {
        this.deadline = deadline;
        this.budgetLimit = budgetLimit;
        this.numOfSubsLimit = numOfSubsLimit;
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
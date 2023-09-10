//lineupsArr - matrix
//Captain - arr
//isTriple - bool
//isWildCard - bool
//BudgetRemaining  - int
//SubsRemaining  - int
//UserTeamName - string
//FantasyRoom - list room ?

// for FU of squad 15 - bench, benchBoost, freeHit, 


// stav - ID 10              Roy - 234

// FUID -  GLT00000ID  -- G - Game, L- League, T-Type of lineup
//example: 1110000010 -   fantasy      epl         lineup            stav 
//example: 2100000234 - predictions   epl        ---------          roy


const path = require("path");
const Player = require('../../Info/Player');
const DBManager = require(path.join(
    __dirname,
    "../../../Database/DBManager"
));

class FantasyUser {
    constructor(
        fantasyUserID,
        userInfo,
        fantasyUserTeamName,
        lineupsArr,
        captain,
        tripleUsedInGameweek,
        wildCardUsedInGameweek,
        subsNumInThisGameweek,
        fantasyRoomsIds,
        startFromGameweek,
    ) {
        this.fantasyUserID = fantasyUserID;
        this.userInfo = userInfo;
        this.fantasyUserTeamName = fantasyUserTeamName;
        this.lineupsArr = lineupsArr;
        this.captain = captain;
        this.tripleUsedInGameweek = tripleUsedInGameweek;
        this.wildCardUsedInGameweek = wildCardUsedInGameweek;
        this.subsNumInThisGameweek = subsNumInThisGameweek;
        this.fantasyRoomsIds = fantasyRoomsIds;
        this.startFromGameweek = startFromGameweek;
    }
    get UserInfo() {
        return this.userInfo;
    }
    get UserTeamName() {
        return this.userTeamName;
    }
    get PlayerGK() {
        return this.playerGK;
    }
    get PlayersDef() {
        return this.playersDef;
    }
    get PlayersMid() {
        return this.playersMid;
    }
    get PlayersAtt() {
        return this.playersAtt;
    }
    get Caption() {
        return this.caption;
    }
    get IsTriple() {
        return this.isTriple;
    }
    get TripleIsUsed() {
        return this.tripleIsUsed;
    }
    get IsWildCard() {
        return this.isWildCard;
    }
    get WildCardIsUsed() {
        return this.wildCardIsUsed;
    }
    get BudgetRemaining() {
        return this.budgetRemaining;
    }
    get SubsRemaining() {
        return this.subsRemaining;
    }


    changeUserInfo(newUserInfo) {
        this.userInfo = newUserInfo;
    }
    changeUserTeamName(newUserTeamName) {
        this.userTeamName = newUserTeamName;
    }
    changePlayerGK(newPlayerGK) {
        this.playerGK = newPlayerGK;
    }
    changePlayersDef(newPlayersDef) {
        this.playersDef = newPlayersDef;
    }
    changePlayersMid(newPlayersMid) {
        this.playersMid = newPlayersMid;
    }
    changePlayersAtt(newPlayersAtt) {
        this.playersAtt = newPlayersAtt;
    }
    changeCaption(newCaption) {
        this.caption = newCaption;
    }
    changeIsTriple(newIsTriple) {
        this.isTriple = newIsTriple;
    }
    changeTripleIsUsed(newTripleIsUsed) {
        this.tripleIsUsed = newTripleIsUsed;
    }
    changeIsWildCard(newIsWildCard) {
        this.isWildCard = newIsWildCard;
    }
    changeWildCardIsUsed(newWildCardIsUsed) {
        this.wildCardIsUsed = newWildCardIsUsed;
    }
    changeBudgetRemaining(newBudgetRemaining) {
        this.budgetRemaining = newBudgetRemaining;
    }
    changeSubsRemaining(newSubsRemaining) {
        this.subsRemaining = newSubsRemaining;
    }

    UpdateUserFantasyInDataBase() {
        DBManager.UpdateUserTeamInDataBase(this);
    }

    CreasteUserFantasyInDataBase() {
        DBManager.CreateFantasyUserInDataBase(this);
    }

}


module.exports = FantasyUser
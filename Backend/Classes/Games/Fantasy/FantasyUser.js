//PlayerGK[1] - player
//PlayerDef[5] - player
//PlayerMid[5] - player
//PlayerAtt[3] - player
//Captain - player
//isTriple - bool
//isWildCard - bool
//BudgetRemaining  - int
//SubsRemaining  - int
//UserTeamName - string

//FantasyUserID - list int [ha'al, premier league , superLeague]
//FantasyRoom - list room ?


// stav - ID 10              Daniel - 234
// FUID HA'AL 101        HA'AL    2341
//  EPL   102        EPL      2342
//  SPL   103        SPL      2343
//  UCL   104        UCL      2344

const path = require("path");
const Player = require('../../Info/Player');
const DBManager = require(path.join(
    __dirname,
    "../../../Database/DBManager"
));

class FantasyUser {
    constructor(
        userInfo,
        userTeamName,
        playerGK,
        playersDef,
        playersMid,
        playersAtt,
    ) {
        this.userInfo = userInfo;
        this.userTeamName = userTeamName;
        this.playerGK = playerGK;
        this.playersDef = playersDef;
        this.playersMid = playersMid;
        this.playersAtt = playersAtt;
        this.caption = new Player(0," ", " ");
        this.isTriple = false;
        this.tripleIsUsed = false;
        this.isWildCard = false;
        this.wildCardIsUsed = false;
        this.budgetRemaining = 100;
        this.subsRemaining = 11;  
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

    UpdateUserFantasyInDataBase()
    {
        DBManager.UpdateUserTeamInDataBase(this);
    }

    CreasteUserFantasyInDataBase()
    {
        DBManager.CreateFantasyUserInDataBase(this);
    }

}


module.exports = FantasyUser
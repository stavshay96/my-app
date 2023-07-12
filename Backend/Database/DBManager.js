'use strict';
const { MongoClient } = require("mongodb");
const uriDB = "mongodb+srv://Pendel:Pendel@pendel.2h5nfcp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uriDB);


async function ConnectToMongoDB() {
    try {
        console.log("Connecting To database...");
        await client.connect();
        console.log("Connecting To database succssed");
    } catch (e) {
        console.log("Error connecting to Data base");
        console.log(e);
    }
}



async function CreateNewPersonInDataBase(NewPerson) {
    let num_of_users = await client.db("Users").collection("Users").estimatedDocumentCount();
    NewPerson.changeUserID(num_of_users + 1);
    const newAddedUser = await client.db("Users").collection("Users").insertOne(NewPerson);
}

async function CheckUserExists(email, password) {
    const user = await client.db("Users").collection("Users").findOne({ email: email, password: password });
    return user;
}

async function FindUserByCookie(email, fullName, userID) {
    const user = await client.db("Users").collection("Users").findOne({ email: email, fullName: fullName, userID: userID });
    return user;
}

async function CreateNewLeagueInDataBase(NewLeague) {
    const newAddedTeam = await client
        .db("LeaguesInfo")
        .collection("Info")
        .insertOne(NewLeague);
}

async function GetLeagueFromDataBase(LeagueName) {
    const league = await client
        .db("LeaguesInfo")
        .collection("Info")
        .findOne({ "leagueName": LeagueName });
    return league;
}

async function GetFantasyUserFromDataBase(userInfo) {
    const fantasyUser = await client
        .db("FantasyGame")
        .collection("FantasyUser")
        .findOne({ "userInfo": userInfo });
    return fantasyUser;
}

async function CreateFantasyUserInDataBase(FantasyUser) {
    await client.db("FantasyGame").collection("FantasyUser").insertOne(FantasyUser);
}

async function UpdateUserTeamInDataBase(FantasyUser) {
    await client.db("FantasyGame").collection("FantasyUser").updateOne(FantasyUser);
}


module.exports = {

    ConnectToMongoDB: ConnectToMongoDB,
    CreateNewPersonInDataBase: CreateNewPersonInDataBase,
    CheckUserExists: CheckUserExists,
    CreateNewLeagueInDataBase: CreateNewLeagueInDataBase,
    UpdateUserTeamInDataBase: UpdateUserTeamInDataBase,
    GetLeagueFromDataBase: GetLeagueFromDataBase,
    GetFantasyUserFromDataBase: GetFantasyUserFromDataBase,
    CreateFantasyUserInDataBase: CreateFantasyUserInDataBase,
    FindUserByCookie: FindUserByCookie,
};
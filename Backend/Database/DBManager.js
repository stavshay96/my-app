'use strict';
const { MongoClient } = require("mongodb");
const uriDB = "mongodb+srv://Pendel:Pendel@pendel.2h5nfcp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uriDB);

///--------------------------------- main connecting ------------------------------/////
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

////--------------------------------- user functions ------------------------////////

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

////--------------------------------- fantasy functions ------------------------////////

async function InsertFantasySettings(FantasySettings) {
    const query = { leagueChoice: FantasySettings.leagueChoice }
    const pervFantasySettings = await client.db("FantasyUser").collection("FantasySettings").findOne(query);

    if (pervFantasySettings) {
        await client.db("FantasyUser").collection("FantasySettings").deleteOne(pervFantasySettings);
        await client.db("FantasyUser").collection("FantasySettings").insertOne(FantasySettings);
    } else {
        return await client.db("FantasyUser").collection("FantasySettings").insertOne(FantasySettings);
    }

}

async function GetFantasySettingsFromDatabase(i_leagueChoice) {
    const query = { leagueChoice: i_leagueChoice }
    try {
        // Use the leagueChoice parameter to fetch the specific Fantasy settings from the database
        const fantasySettings = await client.db("FantasyUser").collection("FantasySettings").findOne(query);
        return fantasySettings;
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        throw error; // You might want to handle this error in the calling function
    }
}


//if teams are in league object in Info collection
async function GetLeagueDataFromDatabase(i_leagueChoice) {
    const query = { englishleagueName: i_leagueChoice }
        //console.log(formattedLeagueChoice);
    try {
        // Use the leagueChoice parameter to fetch the specific Fantasy settings from the database
        const fantasyLeagueData = await client.db("LeaguesInfo").collection("Info").findOne(query);
        //console.log(fantasyLeagueData);
        return fantasyLeagueData;
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        throw error; // You might want to handle this error in the calling function
    }
}


//if teams are in array of object in collection
async function GetLeagueDataFromDatabaseArray(i_leagueChoice) {
    const formattedLeagueChoice = addSpacesToCamelCase(i_leagueChoice);
    //const query = { englishleagueName: i_leagueChoice }
    //console.log(formattedLeagueChoice);
    try {
        // Use the leagueChoice parameter to fetch the specific Fantasy settings from the database
        const fantasyLeagueData = await client.db("Teams").collection(formattedLeagueChoice).find().toArray();
        //console.log(fantasyLeagueData);
        return fantasyLeagueData;
    } catch (error) {
        console.error("Error fetching Fantasy settings:", error);
        throw error; // You might want to handle this error in the calling function
    }
}

function addSpacesToCamelCase(inputString) {
    return inputString.replace(/(?<!^)([A-Z])/g, ' $1');
}


async function CreateNewLeagueInDataBase(NewLeague) {
    const query = { englishleagueName: NewLeague.englishleagueName }

    const league = await client
        .db("LeaguesInfo")
        .collection("Info")
        .findOne(query);

    if (league) {
        await client.db("LeaguesInfo").collection("Info").deleteOne(league);
        await client.db("LeaguesInfo").collection("Info").insertOne(NewLeague);
    } else {
        await client.db("LeaguesInfo").collection("Info").insertOne(NewLeague);
    }
}

async function CreateNewTeamsInDataBase(NewLeague) {

    //const league = await client.db("Teams").getCollection(NewLeague.englishleagueName);
    const collection = client.db("Teams").collection(NewLeague.englishleagueName);
    const documentsArray = await collection.find({}).toArray();

    if (documentsArray.length > 0) {
        await client.db("Teams").collection(NewLeague.englishleagueName).drop();
        await client.db("Teams").collection(NewLeague.englishleagueName).insertMany(NewLeague.teamsList);
    } else {
        await client.db("Teams").collection(NewLeague.englishleagueName).insertMany(NewLeague.teamsList);
    }
}



async function UpdatePlayersPoints(FantasyUser) {
    await client.db("FantasyGame").collection("FantasyUser").updateOne(FantasyUser);
}

async function GetLeagueFromDataBase(LeagueName) {
    const query = { englishleagueName: LeagueName }

    const league = await client
        .db("LeaguesInfo")
        .collection("Info")
        .findOne(query);

    return league;
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
    InsertFantasySettings: InsertFantasySettings,
    GetFantasySettingsFromDatabase: GetFantasySettingsFromDatabase,
    GetLeagueDataFromDatabase: GetLeagueDataFromDatabase,
    GetLeagueDataFromDatabaseArray: GetLeagueDataFromDatabaseArray,
    CreateNewTeamsInDataBase: CreateNewTeamsInDataBase,

};
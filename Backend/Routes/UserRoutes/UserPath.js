const express = require("express");
const UserRouter = express.Router();
module.exports = UserRouter;
const path = require("path");
const User = require('../../Classes/User');

const DBManager = require(path.join(
    __dirname,
    "../../Database/DBManager"
));



UserRouter.post("/UserCookie", async(req, res) => {
    let user = await GetUserCookie(req.body.email, req.body.fullName, req.body.userID);
    res.cookie("userInfo", user.userInfo);
    res.send(user);
})



async function GetUserCookie(email, fullName, userID) {
    const userDocument = await DBManager.FindUserByCookie(email, fullName, userID);


    if (userDocument != null) {
        return { Status: "Login succssed", userInfo: userDocument };
    } else {
        return {
            Status: "Login failed",
            Reason: "Incorrent email, full name or userID ",
        };
    }
}

//----------------------------------- Login ----------------------------------------//

UserRouter.post("/Login", async(req, res) => {
    let user = await Login(req.body.email, req.body.password);
    //console.log(user);
    res.cookie("userInfo", user.userInfo);
    res.send(user);
});

async function Login(email, password) {

    console.log(email);
    console.log(password);

    if (!email) {
        return {
            Status: "Login Failed",
            Reason: "Missing input, email",
        };
    }
    if (!password) {
        return {
            Status: "Login Failed",
            Reason: "Missing input, password",
        };
    }

    const userDocument = await DBManager.CheckUserExists(email, password);

    if (userDocument != null) {
        return { Status: "Login succssed", userInfo: userDocument };
    } else {
        return {
            Status: "Login failed",
            Reason: "Incorrent email and password",
        };
    }


    // return to http response
}




//----------------------------------- SignUp ----------------------------------------//

UserRouter.post("/SignUp", async(req, res) => {
    // console.log(req.body.fullName);
    res.send(await SignUp(req.body.fullName, req.body.email, req.body.password));
});

async function SignUp(fullName, email, password) {
    //onsole.log(fullName);
    if (!fullName) {
        return {
            Status: "Sign Up Failed",
            Reason: "Missing input, fullName",
        };
    }
    console.log(email);
    if (!email) {
        return {
            Status: "Login Failed",
            Reason: "Missing input, email",
        };
    }
    console.log(password);
    if (!password) {
        return {
            Status: "Login Failed",
            Reason: "Missing input, password",
        };
    }

    const userDocument = await DBManager.CheckUserExists(email, password);

    if (userDocument == null) {
        const user = new User(0, fullName, email, password);
        await DBManager.CreateNewPersonInDataBase(user);
        return { Status: "Sign Up succssed" };
    } else {
        return {
            Status: "Sign Up Failed",
            Reason: "There is a user with that email already",
        };
    }

    // return to http response
}
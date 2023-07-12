'use strict';
const express = require("express");
const userRouter = require(`${__dirname}/Routes/UserRoutes/UserPath`);
const fantasyRouter = require(`${__dirname}/Routes/FantasyRoutes/FantasyPath`);

const path = require("path");
const app = express();
const port = 7777;
const bodyParser = require("body-parser");
const cors = require("cors");


//console.log("Pendel");

const DBManager = require(path.join(
    __dirname,
    "Database/DBManager"
));


app.listen(port, async() => {
    console.log(`listening on port ${port}`);
    await DBManager.ConnectToMongoDB();
    console.log("Server is Ready !!!");
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

app.use("/User", userRouter);
app.use("/Fantasy", fantasyRouter);
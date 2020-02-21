const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const nodeCleanup = require("node-cleanup");

const {
    viewCompleteBoard,
    viewByUserName,
    addToDataBase,
    getListOfCollections,
    createNewSprint,
    Connection,
    changeVote
} = require("./database/mongo");

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads
app.get("/", (req, res) => {
    getListOfCollections()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err);
        });
});

app.get("/sprint/:name", (req, res) => {
    console.log("req = " + req.body.name);
    createNewSprint(req.body.name);
    viewCompleteBoard(req.body.name)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

app.get("/Board", (req, res) => {
    console.log("req = " + req.body.sprint);
    viewCompleteBoard("sprint_2008")
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

app.post("/update/:name", (req, res) => {
    console.log("sprint = " + req.body.sprint);
    console.log("name = " + req.body.name);
    console.log("type = " + req.body.type);
    console.log("message = " + req.body.message);
    console.log("date = " + req.body.date);
    console.log("vote = " + req.body.vote);

    let data = {
        name: req.body.name,
        type: req.body.type,
        message: req.body.message,
        date: req.body.date,
        Votes: req.body.vote
    };

    addToDataBase(req.body.sprint, data)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get("/search", (req, res) => {
    console.log("req = " + req.body.name);
    viewByUserName(req.body.sprint, req.body.name)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

app.get("/addvote", (req, res) => {
    console.log("req = " + req.body.name);
    changeVote(req.body.sprint, req.body.name, req.body.vote)
        .then(result => {
            //console.log(result);
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

nodeCleanup(function(exitCode, signal) {
    // release resources here before node exits
    console.log("Received signal to exit");
    Connection.closeDB();
});

Connection.connectToMongo();

// starting the server
app.listen(3000, () => {
    console.log("listening on port 3000");
});
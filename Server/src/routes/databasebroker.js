const uuidv1 = require('uuid/v1');

var express = require("express");
var routes = express.Router();

const { DBClient } = require("../database/mongo");

// defining an endpoint to return all ads
routes.get("/", (req, res) => {
});

routes.get("/sprint/:name", (req, res) => {
    console.log("req = " + req.body.name);
    DBClient.createNewSprint(req.body.name);
    DBClient.viewCompleteBoard(req.body.name)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

routes.get("/getTeams", (req, res) => {
    DBClient.getTeams()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err);
        });
});

routes.post("/getSprints", (req, res) => {
    if (!req.body.teamName)
    {
        return res.status(400).send('Team name is not defined!');
    }
    DBClient.getSprints(req.body.teamName)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err);
        });
});

routes.post("/createSprint", (req, res) => {
    if (!req.body.owner)
    {
        return res.status(400).send('Team name is not defined!');
    }
    if (!req.body.sprintName)
    {
        return res.status(400).send('Sprint name is not defined!');
    }
    var sprintDbName= req.body.sprintName.trim().toLowerCase().replace(/[^A-Z0-9]+/ig, "_");
    DBClient.findSprint(req.body.owner, sprintDbName)
        .then(result => {
            if (result && result.length) {
                return res.status(400).send('Sprint exists!');
            } else {
                let sprint = {
                    _id: uuidv1(),
                    teamName: req.body.owner,
                    sprintName: sprintDbName,
                    displayName: req.body.sprintName,
                    date: new Date()
                };
                DBClient.addItemToCollection("Sprints", sprint)
                    .then(result => {
                        res.send(result);
                    })
                    .catch(error => {
                        console.error(error);
                    });    
            };
        })
        .catch(error => {
            console.error(error);
        });
});

routes.post("/createTeam", (req, res) => {
    if (!req.body.teamName)
    {
        return res.status(400).send('Team name is not defined!');
    }
    var dbName= req.body.teamName.trim().toLowerCase().replace(/[^A-Z0-9]+/ig, "_");
    DBClient.findByName("Teams", dbName)
        .then(result => {
            if (result && result.length) {
                return res.status(400).send('Team exists!');
            } else {
                let team = {
                    _id: uuidv1(),
                    name: dbName,
                    displayName: req.body.teamName,
                    date: new Date()
                };
                DBClient.addItemToCollection("Teams", team)
                    .then(result => {
                        res.send(result);
                    })
                    .catch(error => {
                        console.error(error);
                    });    
            };
        })
        .catch(error => {
            console.error(error);
        });
});

routes.get("/Board", (req, res) => {
    console.log("req = " + req.body.sprint);
    DBClient.viewCompleteBoard("sprint_2006")
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

routes.post("/update/:name", (req, res) => {
    console.log("req = " + req.body.name);

    let item = {
        name: req.body.name,
        type: req.body.type,
        message: req.body.message,
        date: req.body.date,
        Votes: req.body.vote
    };

    DBClient.addItemToCollection(req.body.sprint, item)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
});

routes.get("/search", (req, res) => {
    console.log("req = " + req.body.name);
    DBClient.viewByUserName(req.body.sprint, req.body.name)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

routes.post("/deletepost", (req, res) => {
    console.log("req = " + req.body.id);
    DBClient.deletePost(req.body.sprint, req.body.id)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

routes.post("/addvote", (req, res) => {
    console.log("req = " + req.body.sprint);
    DBClient.addVote(req.body.sprint, req.body.id)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

routes.post("/removevote", (req, res) => {
    console.log("req = " + req.body.id);
    DBClient.removeVote(req.body.sprint, req.body.id)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error(error);
        });
});

module.exports = routes;
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const dbName = "Team_Panda";

class DBConnection {
    static async connectToMongo() {
        if (this.db) return this.db;
        this.connection = await MongoClient.connect(
            this.url, { useUnifiedTopology: true },
            this.options
        );
        this.db = this.connection.db(dbName);
        this.db.createCollection("Teams", function(err, result) {
            if (err) throw err;
            console.log("Teams collection is created!");
        });
        this.db.createCollection("Sprints", function(err, result) {
            if (err) throw err;
            console.log("Sprints collection is created!");
        });
        console.log("connection complete");
        return this.db;
    }
    static async closeDB() {
        this.connection.close();
        console.log("DB closed");
    }
}

DBConnection.db = null;
DBConnection.connection = null;
DBConnection.url = "mongodb://127.0.0.1:27017/";
DBConnection.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true
};

class DBClient {
    static async createCollection(collectionName) {
        await DBConnection.db.createCollection(collectionName, function(err, result) {
            if (err) throw err;
            console.log("Collection is created!");
        });
    }

    static async addItemToCollection(collectionName, item) {

        console.log("addItemToCollection" + collectionName + item);
        return await DBConnection.db
            .collection(collectionName)
            .insertOne(item);
    }

    static async viewCompleteBoard(collectionName) {
        console.log("view board start :name = " + collectionName);
        return DBConnection.db
            .collection(collectionName)
            .find()
            .toArray();
    }

    static async viewByUserName(collectionName, userName) {
        let myQuery = { name: userName };
        return await DBConnection.db
            .collection(collectionName)
            .find(myQuery)
            .toArray();
    }

    static async addToDataBase(collectionName, userInfo) {
        return await DBConnection.db
            .collection(collectionName)
            .insertOne(userInfo)
            .toArray();
    }
    
    static async findByName(collectionName, itemName) {
        let myQuery = { name: itemName };
        return await DBConnection.db
            .collection(collectionName)
            .find(myQuery)
            .toArray();
    }
    
    static async findSprint(team, sprint) {
        let myQuery = {
            teamName: team,
            sprintName: sprint
        };
        return await DBConnection.db
            .collection("Sprints")
            .find(myQuery)
            .toArray();
    }

    static async getTeams() {
        let myQuery = { };
        return await DBConnection.db
            .collection("Teams")
            .find()
            .toArray();
    }

    static async getSprints(teamName) {
        let myQuery = {
            owner: teamName
        };
        return await DBConnection.db
            .collection("Sprints")
            .find()
            .toArray();
    }

    static async viewByUserName(collectionName, userName) {
        let myQuery = { name: userName };
        return await Connection.db
            .collection(collectionName)
            .find(myQuery)
            .toArray();
    }

    static async getListOfCollections() {
        return await DBConnection.db.listCollections().toArray();
    }

    static async createNewSprint(sprintName) {
        return await createCollection(sprintName);
    }

    // sprintName is same as collectionName
    static async addVote(sprintName, id) {
        console.log("id = " + id);
        return await DBConnection.db
            .collection(sprintName)
            .updateOne({ _id: ObjectID(id) }, { $inc: { Votes: 1 } });
    }

    static async removeVote(sprintName, id) {
        console.log("id = " + id);
        return await DBConnection.db
            .collection(sprintName)
            .updateOne({ _id: ObjectID(id) }, { $inc: { Votes: -1 } });
    }

    static async deletePost(sprintName, id) {
        console.log("id = " + id);
        return await DBConnection.db
            .collection(sprintName)
            .deleteOne({ _id: ObjectID(id) });
    }

    static async generatePDF(sprintName) {
        console.log("Generate PDF for " + sprintName);
        let myQuery = { name: 1 };
        DBConnection.db
            .collection(sprintName)
            .find()
            .sort(myQuery)
            .toArray()
            .then(result => {
                result
                    .forEach()
                    .then(result => {
                        let tempName = result.name;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }
}
module.exports = {
    DBConnection,
    DBClient
};
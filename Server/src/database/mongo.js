const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const dbName = "Team_Panda";

class Connection {
    static async connectToMongo() {
        if (this.db) return this.db;
        this.connection = await MongoClient.connect(this.url, this.options);
        this.db = this.connection.db(dbName);
        console.log("connection complete");
        return this.db;
    }
    static async closeDB() {
        this.connection.close();
        console.log("DB closed");
    }
}

Connection.db = null;
Connection.connection = null;
Connection.url = "mongodb://127.0.0.1:27017/";
Connection.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true
};

async function createCollection(collectionName) {
    await Connection.db.createCollection(collectionName);
}

function viewCompleteBoard(collectionName) {
    console.log("view board start :name = " + collectionName);
    return Connection.db
        .collection(collectionName)
        .find()
        .toArray();
}

async function viewByUserName(collectionName, userName) {
    let myQuery = { name: userName };
    return await Connection.db
        .collection(collectionName)
        .find(myQuery)
        .toArray();
}

async function addToDataBase(collectionName, userInfo) {
    return await Connection.db
        .collection(collectionName)
        .insertOne(userInfo)
        .toArray();
}

async function getListOfCollections() {
    return await Connection.db.listCollections().toArray();
}

async function createNewSprint(sprintName) {
    return await createCollection(sprintName);
}

// sprintName is same as collectionName
async function changeVote(sprintName, id, voteCount) {
    console.log("vote count = " + voteCount);
    console.log("id = " + id);
    return await Connection.db
        .collection(sprintName)
        .updateOne({ _id: ObjectID(id) }, { $set: { Votes: voteCount } });
}

module.exports = {
    createCollection,
    viewCompleteBoard,
    viewByUserName,
    addToDataBase,
    getListOfCollections,
    createNewSprint,
    Connection,
    changeVote
};
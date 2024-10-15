const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGO_URI;
let db;

const initDb = (callback) => {
    if (db) {
        console.log('Database is already initialized');
        return callback(null, db);
    }
    
    MongoClient.connect(connectionString)
        .then((client) => {
            db = client.db();
            console.log('Connected to MongoDB');
            callback(null, db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};

module.exports = {
    initDb,
    getDb
};
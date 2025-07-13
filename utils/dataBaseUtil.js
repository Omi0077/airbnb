const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL = process.env.DB_URL

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("DB connected seccefully");
      callback();
      _db = client.db('airbnb')
    })
    .catch((err) => {
      console.log("error connecting: ", err);
    });
};

const getDB = ()=>{
    if(!_db){
        throw new Error('DB isnt connect now')
    }
    else{
        return _db
    }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
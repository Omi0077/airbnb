// local modules
const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/dataBaseUtil");
const Favourite = require("./favourites");

module.exports = class Home {
  constructor(houseName, price, location, rating, imageURL, description) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.imageURL = imageURL;
    this.description = description;
  }

  save() {
    const db = getDB();
    return db.collection("homes").insertOne(this);
  }

  static getAllHomes() {
    const db = getDB();
    // .find returns a cursor, an iterator over result set
    return db.collection("homes").find().toArray();
  }

  static findHome(id) {
    const db = getDB();
    // need to call next to get the obj
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(id)) })
      .next();
  }

  static updateHome(newHome) {
    const db = getDB();

    // updateOne is trying to change _id too which is immutable
    const { _id, ...dataToUpdate } = newHome;

    return db
      .collection("homes")
      .updateOne({ _id: new ObjectId(String(_id)) }, { $set: dataToUpdate });
  }

  static deleteHome(idToDelete) {
    const db = getDB();
    Favourite.deleteFavourite(idToDelete).then((result) => {
      console.log("fav removed", result);
    });
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(idToDelete)) });
  }
};

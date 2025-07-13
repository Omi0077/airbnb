//local module
const { getDB } = require("../utils/dataBaseUtil");

module.exports = class Favourite {
  constructor(houseID) {
    this.houseID = houseID;
  }

  static getFavourites() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  save() {
    const db = getDB();
    return db.collection("favourites")
      .findOne({ houseID: this.houseID })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favourites").insertOne(this);
        } else {
          return Promise.reject('already fav')
        }
      })
  }

  static deleteFavourite(idToBeDeleted) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ houseID: idToBeDeleted });
  }
};

// local modules
const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  imageURL: String,
  description: String,
});

["findOneAndDelete", "findByIdAndDelete"].forEach((method) => {
  houseSchema.pre(method, async function (next) {
    const houseID = this.getQuery()["_id"];

    await mongoose.model("User").updateMany({favourites: houseID},
      {$pull:{favourites: houseID}}
    )

    // await Favourite.deleteMany({ houseID });
    // next(); next isnt needed in async function
  });
});

module.exports = mongoose.model("House", houseSchema);

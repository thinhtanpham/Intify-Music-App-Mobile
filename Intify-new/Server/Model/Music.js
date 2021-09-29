const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Music = new Schema(
  {
    nameSong: { type: String, required: true },
    nameArtist: { type: String, required: true },
    idUser: { type: String, required: true},
    img: { type: String, required: true },
    mp3: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Music", Music);

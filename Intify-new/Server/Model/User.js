const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nameApp: { type: String, required: true },
    imgArtist: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);

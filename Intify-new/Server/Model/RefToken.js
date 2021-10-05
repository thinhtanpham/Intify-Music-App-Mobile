const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefToken = new Schema(
  {
    idUser: { type: String, required: true, unique: true },
    refToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefToken", RefToken);

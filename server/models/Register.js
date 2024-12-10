const mongoose = require("mongoose"); // used to connect to database
const Schema = mongoose.Schema; // used to create schema

const RegisterSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// connecting to database...the first property is the collection name, second is the schema
const RegisterModel = mongoose.model("register", RegisterSchema, "register");

module.exports = RegisterModel;

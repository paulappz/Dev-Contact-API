'use strict';
const mongoose = require("mongoose"),
bcrypt = require('bcryptjs'),
Schema = mongoose.Schema;

// Create db schema for user
const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type:String,
    unique:true,
    lovercase:true,
    trim:true,
    required:true
  } ,
  hash_password: {
    type:String,
    required:true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.hash_password);
}

// create and export model
module.exports = mongoose.model("User", UserSchema);


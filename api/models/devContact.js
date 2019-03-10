'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create db schema
const ContactSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lovercase: true,
    trim: true,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  Phoneno: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['front-end', 'backend', 'fullstack', 'ios', 'android']
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// create and export model
module.exports = mongoose.model("ContactModel", ContactSchema);
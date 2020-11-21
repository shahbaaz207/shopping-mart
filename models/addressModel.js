const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    
  },
  mobile: {
    type: String,
    required: true,
  },
  
  code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("E-commerace_Address", userSchema);

module.exports = userModel;

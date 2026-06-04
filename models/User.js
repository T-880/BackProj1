const mongoose = require("mongoose");

// Schema för användare som kan logga in i administrationssystemet
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  // Användarroll som styr behörighet i systemet
  role: {
    type: String,
    enum: ["chef", "admin"],
    default: "admin",
  },
});

module.exports = mongoose.model("User", userSchema);
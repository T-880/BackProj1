const mongoose = require("mongoose");

// Schema för menyobjekt som lagras i databasen
const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },

  // Markerar om rätten är månadens special
  monthly_special: {
    type: Boolean,
    default: false,
  },

  // Datum då menyobjektet skapades
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Referens till användaren som skapade menyobjektet
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
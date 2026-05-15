const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const MenuItem = require("../models/MenuItem");


// Hämtar alla menyobjekt
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();

    res.json(items);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Skapar nytt menyobjekt (för endast admin)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);

    await newItem.save();

    res.status(201).json({
      message: "Menyobjekt skapat",
      item: newItem,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
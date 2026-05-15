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

// Uppdaterar menyobjekt (för endast admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menyobjekt hittades inte" });
    }

    res.json({
      message: "Menyobjekt uppdaterat",
      item: updatedItem,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Tar bort menyobjekt (för endast admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menyobjekt hittades inte" });
    }

    res.json({
      message: "Menyobjekt borttaget",
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
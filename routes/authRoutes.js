const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");


// Registrera
router.post("/register", async (req, res) => {
  try {

    const { username, password } = req.body;

    // Kontrollerar om användaren redan finns
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Användaren finns redan",
      });
    }

    // Hashar lösenord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapar användare
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Användare skapad",
    });

  } catch (error) {

    res.status(500).json({
      message: "Serverfel",
    });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    // Kontrollerar användaren
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Fel användarnamn eller lösenord",
      });
    }

    // Kontrollerar lösenordet
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Fel användarnamn eller lösenord",
      });
    }

    // Skapar JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
    });

  } catch (error) {

    res.status(500).json({
      message: "Serverfel",
    });
  }
});

module.exports = router;
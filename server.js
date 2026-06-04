const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Importerar databasanslutning och routes
const connectDB = require("./config/db");

const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Ansluter till MongoDB
connectDB();

// Gör filer i public-mappen tillgängliga
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());

// API-routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

// Testar route
app.get("/", (req, res) => {
  res.send("Forno Nero API körs!");
});

// Startar server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
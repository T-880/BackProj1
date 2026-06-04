const mongoose = require("mongoose");

// Ansluter till MongoDB-databasen
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        // Skriver ut felmeddelande och avslutar servern vid misslyckad anslutning
        console.error("MongoDB connection error:", error);

        process.exit(1);
    }
};

module.exports = connectDB;
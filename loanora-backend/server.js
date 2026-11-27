require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/connectToDB.js");
const authRoutes = require("./routes/authRoutes.js");
const app = express();

app.use(cors());
app.use(express.json());

// Check database connection
app.get("/dbconnection", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1");
        
        res.status(200).json({
            message: "Database connected successfully",
            result: result
        });
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});
app.use("/api/auth", authRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
    console.log(`Loanora server running on port ${PORT}`);
});
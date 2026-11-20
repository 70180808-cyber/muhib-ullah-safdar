const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const fs = require("fs");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/status", (req, res) => {
    res.json({
        message: "AskSE Help Desk is working!"
    });
});

app.get("/api/faqs", (req, res) => {
    const filePath = path.join(__dirname, "faqs.json");

    const faqs = JSON.parse(fs.readFileSync(filePath, "utf8"));

    res.json(faqs);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
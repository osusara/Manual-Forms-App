const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./config/config.env" });

connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());

// Define routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/form", require("./routes/api/form"));
app.use("/api/file", require("./routes/api/file"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "clien", "build", "index.html")));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

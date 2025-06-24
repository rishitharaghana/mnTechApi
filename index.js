const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 4001;
const path = require("path");
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});
app.disable("x-powered-by");
const corsOptions = {
  origin: ["http://mntechs.com", "https://mntechs.com"], // allow both http and https
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
  .connect(
    "mongodb+srv://jrishitha2001:J4n3n2LpZITWnf2K@cluster1.jdv16cf.mongodb.net/ProjectDb?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const contactRoutes = require("./routes/contactRoutes");
app.use("/contact", contactRoutes);
const reachRoutes = require("./routes/reachRoutes");
app.use("/reach", reachRoutes);
const dynamicAssetsRoutes = require("./routes/dynamicAssetsRoutes");
app.use("/dynamic", dynamicAssetsRoutes);
const newsLetterRoutes = require("./routes/newsLetterRoutes");
app.use("/newsLetter", newsLetterRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

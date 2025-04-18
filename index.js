// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./routes/authRoutes.js");
const projectRoutes = require("./routes/projectRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const cors = require("cors");
// const { contactController } = require("./controllers/contact.js");
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(
  "mongodb+srv://udayrana428:surendra@cluster0.px7ut.mongodb.net/portfolio",
  {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Replace with your first origin
      "https://udayrana428.github.io",
      "https://uday-rana-portfolio.vercel.app", // Replace with your second origin
      // Add more origins as needed
    ],
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("welcome to my site");
});
// Define your routes here
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express"); // used to create server
const mongoose = require("mongoose"); // used to connect to database
const cors = require("cors"); // used for cross origin resource sharing
const RegisterModel = require("./models/Register");
require("dotenv").config(); // Load .env variables

const app = express(); // creating a server
app.use(express.json()); // used to parse json data
// used for cross origin resource sharing
app.use(
  cors({
    origin: "https://deploy-registration-practice-mern-api.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow sending cookies
  })
);

// app.use(cors());

// connecting to database
mongoose.connect(process.env.MONGO_URI);

app.get("/", (request, response) => {
  response.json("Keep Going!");
});

app.post("/register", (request, response) => {
  const { name, email, password } = request.body;
  //   console.log(request.body);

  // Check if user already exists
  RegisterModel.findOne({ email })
    .then((user) => {
      if (user) {
        response.json({ message: "User already exists" });
      } else {
        // Create and save a new user
        const newUser = new RegisterModel({ name, email, password });
        newUser
          .save()
          .then((result) => {
            console.log("User created successfully:", result);
            // console.log(request.json(result));
            response.status(201).json({ message: "User created successfully" });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            response.status(500).json({ error: "Failed to create user" });
          });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      response.status(500).json({ error: "Database error" });
    });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

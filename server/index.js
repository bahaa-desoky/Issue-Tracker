import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from "./routes/tickets.js";
import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/auth.js";

const app = express();
dotenv.config(); // this is to use environmental variables

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// connect routes
app.use("/tickets", ticketRoutes);
app.use("/projects", projectRoutes);
app.use("/auth", userRoutes);

app.get("/", (request, response) => {
  response.send("Issue Tracker API");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

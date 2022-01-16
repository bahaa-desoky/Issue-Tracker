// routes related to the tickets of the app
import express from "express";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// auth middleware to perform CRUD operations
router.get("/", auth, getTickets);
router.post("/", auth, createTicket);
router.patch("/:id", auth, updateTicket); // :id is so we can know which post must be updated in db
router.delete("/:id", auth, deleteTicket); // :id is so we can know which post must be deleted in db

export default router;

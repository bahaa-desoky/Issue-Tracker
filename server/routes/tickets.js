// routes related to the tickets of the app
import express from "express";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.patch("/:id", updateTicket); // :id is so we can know which post must be updated in db
router.delete("/:id", deleteTicket); // :id is so we can know which post must be deleted in db

export default router;

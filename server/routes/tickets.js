// routes related to the tickets of the app
import express from "express";
import { getTickets, createTicket } from "../controllers/tickets.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", createTicket);

export default router;

// routes related to the users/auth of the app
import express from "express";
import { signIn, signUp } from "../controllers/auth.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;

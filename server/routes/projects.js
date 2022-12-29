// routes related to the projects of the app
import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// auth middleware to perform CRUD operations
router.get("/", auth, getProjects);
router.post("/", auth, createProject);
router.patch("/:id", auth, updateProject); // :id is so we can know which post must be updated in db
router.delete("/:id", auth, deleteProject); // :id is so we can know which post must be deleted in db

export default router;

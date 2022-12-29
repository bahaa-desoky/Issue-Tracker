import mongoose from "mongoose";
import ProjectModel from "../models/projectModel.js";

export const getProjects = async (request, response) => {
  try {
    const projects = await ProjectModel.find();
    response.status(200).json(projects);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const createProject = async (request, response) => {
  const project = request.body;
  const newProject = new ProjectModel({
    ...project,
    author: request.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newProject.save();
    response.status(201).json(newProject);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const updateProject = async (request, response) => {
  const project = request.body;
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send("Invalid id");

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    id,
    { ...project, id },
    {
      new: true,
    }
  ); // this updates the entry _id with the new info from request
  response.json(updatedProject);
};

export const deleteProject = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send("Invalid id");

  await ProjectModel.findByIdAndRemove(id);
  response.json("Deleted project");
};

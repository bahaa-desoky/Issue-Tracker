import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  author: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const project = mongoose.model("ProjectModel", projectSchema);
export default project;

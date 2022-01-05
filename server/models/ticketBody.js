import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  project: String,
  title: String,
  description: String,
  author: String,
  priority: String,
  resolved: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ticketBody = mongoose.model("TicketBody", ticketSchema);
export default ticketBody;

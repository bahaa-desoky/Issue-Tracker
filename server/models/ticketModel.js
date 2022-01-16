import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  project: String,
  title: String,
  description: String,
  name: String,
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

const ticket = mongoose.model("TicketModel", ticketSchema);
export default ticket;

import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  title: String,
  body: String,
  author: String,
  priority: String,
  resolved: Boolean,
  comments: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ticketBody = mongoose.model("TicketBody", ticketSchema);
export default ticketBody;

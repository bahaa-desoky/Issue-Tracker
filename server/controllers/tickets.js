import mongoose from "mongoose";
import TicketModel from "../models/ticketModel.js";

export const getTickets = async (request, response) => {
  try {
    const tickets = await TicketModel.find();
    response.status(200).json(tickets);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const createTicket = async (request, response) => {
  const ticket = request.body;
  const newTicket = new TicketModel({
    ...ticket,
    author: request.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newTicket.save();
    response.status(201).json(newTicket);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const updateTicket = async (request, response) => {
  const ticket = request.body;
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send("Invalid id");

  const updatedTicket = await TicketModel.findByIdAndUpdate(
    id,
    { ...ticket, id },
    {
      new: true,
    }
  ); // this updates the entry _id with the new info from request
  response.json(updatedTicket);
};

export const deleteTicket = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send("Invalid id");

  await TicketModel.findByIdAndRemove(id);
  response.json("Deleted ticket");
};

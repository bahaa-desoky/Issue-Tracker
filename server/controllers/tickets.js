import TicketBody from "../models/ticketBody.js";

export const getTickets = async (request, response) => {
  try {
    const tickets = await TicketBody.find();
    response.status(200).json(tickets);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const createTicket = async (request, response) => {
  const ticket = request.body;
  const newTicket = new TicketBody(ticket);
  try {
    await newTicket.save();
    response.status(201).json(newTicket);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

import axios from "axios";

const url = "http://localhost:5000/tickets";

export const fetchTickets = () => {
  return axios.get(url);
};

export const createTicket = (newTicket) => {
  return axios.post(url, newTicket);
};

export const updateTicket = (id, updatedTicket) => {
  return axios.patch(`${url}/${id}`, updatedTicket);
};

export const deleteTicket = (id) => {
  return axios.delete(`${url}/${id}`);
};

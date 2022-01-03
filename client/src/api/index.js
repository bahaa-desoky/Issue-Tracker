import axios from "axios";

const url = "http://localhost:5000/tickets";

export const fetchTickets = () => {
  return axios.get(url);
};

export const createTicket = (ticket) => {
  return axios.post(url, ticket);
};

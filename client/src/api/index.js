import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// send token to middleware to verify login before performing CRUD operations
API.interceptors.request.use((request) => {
  if (localStorage.getItem("profile")) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return request;
});

export const fetchTickets = () => {
  return API.get("/tickets");
};

export const createTicket = (newTicket) => {
  console.log(newTicket);
  return API.post("/tickets", newTicket);
};

export const updateTicket = (id, updatedTicket) => {
  return API.patch(`/tickets/${id}`, updatedTicket);
};

export const deleteTicket = (id) => {
  return API.delete(`/tickets/${id}`);
};

export const signIn = (formData) => {
  return API.post("/auth/signIn", formData);
};

export const signUp = (formData) => {
  return API.post("/auth/signUp", formData);
};

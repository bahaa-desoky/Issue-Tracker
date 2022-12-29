import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/",
});

// send token to middleware to verify login before performing CRUD operations
API.interceptors.request.use((request) => {
  if (localStorage.getItem("profile")) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return request;
});

export const fetchProjects = () => {
  return API.get("/projects");
};

export const createProject = (newProject) => {
  return API.post("/projects", newProject);
};

export const updateProject = (id, updatedProject) => {
  return API.patch(`/projects/${id}`, updatedProject);
};

export const deleteProject = (id) => {
  return API.delete(`/projects/${id}`);
};

export const fetchTickets = () => {
  return API.get("/tickets");
};

export const createTicket = (newTicket) => {
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

import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export const getTickets = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTickets();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = (ticket) => async (dispatch) => {
  try {
    const { data } = await api.createTicket(ticket);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTicket = (id, ticket) => async (dispatch) => {
  try {
    const { data } = await api.updateTicket(id, ticket);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTicket = (id) => async (dispatch) => {
  try {
    await api.deleteTicket(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

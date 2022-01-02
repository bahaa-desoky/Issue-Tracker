import * as api from "../api";

export const getTickets = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTickets();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

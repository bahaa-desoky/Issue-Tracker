import { createSlice } from "@reduxjs/toolkit";

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: { tickets: [] },
  reducers: {
    setTicketsState: (state, action) => {
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user) {
        state.tickets = action.payload.filter(
          (ticket) => ticket.author === user.result._id
        );
      }
    },
  },
});

export const { setTicketsState } = ticketsSlice.actions;
export default ticketsSlice.reducer;

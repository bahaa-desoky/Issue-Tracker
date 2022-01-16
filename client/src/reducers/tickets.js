import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (tickets = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      const user = JSON.parse(localStorage.getItem("profile"));
      console.log(user);
      console.log(action.payload);
      return action.payload.filter((ticket) => {
        if (user.result._id && !user.result.googleId) {
          return ticket.author === user.result._id;
        } else {
          return ticket.author === user.result.googleId;
        }
      });
    case CREATE:
      return [...tickets, action.payload];
    case UPDATE:
      // return the tickets, but 'replace' the ticket that was updated with the payload
      return tickets.map((ticket) =>
        ticket._id === action.payload._id ? action.payload : ticket
      );
    case DELETE:
      return tickets.filter((ticket) => ticket._id !== action.payload); // the payload from actions is just the id
    default:
      return tickets;
  }
};

export default (tickets = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...tickets, action.payload];
    case "UPDATE":
      // return the tickets, but 'replace' the ticket that was updated with the payload
      return tickets.map((ticket) =>
        ticket._id == action.payload._id ? action.payload : ticket
      );
    case "DELETE":
      return tickets.filter((ticket) => ticket._id != action.payload); // the payload from actions is just the id
    default:
      return tickets;
  }
};

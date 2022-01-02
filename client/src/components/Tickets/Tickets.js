import React from "react";
import Ticket from "./Ticket/Ticket";
import { useSelector } from "react-redux";

const Tickets = () => {
  // from reducers
  const tickets = useSelector((state) => state.tickets);
  return (
    <>
      <h1>TICKETS</h1>
      <Ticket />
      <Ticket />
    </>
  );
};

export default Tickets;

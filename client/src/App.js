import React from "react";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import "./styles.css";
import Tickets from "./components/Tickets/Tickets.js";
import Form from "./components/Form/Form.js";
import { getTickets } from "./actions/tickets";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <div>
      <ResponsiveAppBar />
      <Form />
    </div>
  );
};

export default App;

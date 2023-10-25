import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Calendar from "./components/Calendar/Calendar";
import globalStyle from "./public/globalStyles.module.css"; 

function App() {
  return (
    <BrowserRouter>
      <nav className={globalStyle.navbar}>
        <ul>
          <li>
            <Link to="/">Todo List</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<TodoContainer />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

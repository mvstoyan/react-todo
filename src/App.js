import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Calendar from "./components/Calendar/Calendar";
import globalStyle from "./public/globalStyles.module.css";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route exact path="/" element={<TodoContainer />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainNavigation() {
  let location = useLocation();

  return (
    <nav className={globalStyle.navbar}>
      <ul>
        {location.pathname !== "/" && (
          <li>
            <Link to="/">Todo List</Link>
          </li>
        )}
        {location.pathname !== "/calendar" && (
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default App;
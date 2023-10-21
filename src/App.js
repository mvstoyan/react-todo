import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Calendar from "./components/Calendar/Calendar";
import style from "./public/globalStyles.module.css"; 

function App() {
  return (
    <BrowserRouter>
      <nav className={style.navbar}>
        <ul>
          <li>
            <Link to="/">Calendar</Link>
          </li>
          <li>
            <Link to="/todo">Todo List</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Calendar />} />
        <Route path="/todo" element={<TodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

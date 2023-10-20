import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Home from "./components/Home/Home";
import style from "./public/globalStyles.module.css"; 

function App() {
  return (
    <BrowserRouter>
      <nav className={style.navbar}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo List</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/todo" element={<TodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

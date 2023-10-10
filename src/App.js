import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactTodo from "./reactTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ReactTodo />} />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

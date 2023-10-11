import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactTodo from "./components/reactTodo/reactTodo";
import Animation from "./components/Animation/animation";
import "./public/globalStyles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ReactTodo />} />
        <Route path="/new" element={<Animation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Todo from "./components/Todolist/Main";

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;

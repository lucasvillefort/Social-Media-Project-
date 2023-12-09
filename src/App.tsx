import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

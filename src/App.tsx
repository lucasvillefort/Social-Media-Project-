import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Login } from "./pages/login";
import { NavBar } from "./components/navbar";
import { CreatePost } from "./pages/createPost/create-post";
import { Home } from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

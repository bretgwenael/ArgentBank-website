import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/sass/main.scss"

import Landing from "./pages/landing.jsx/Landing"
import SignIn from "./pages/signIn.jsx/SignIn";
import User from "./pages/user.jsx/User";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/user" element={<User />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;

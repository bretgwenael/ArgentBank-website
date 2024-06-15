import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../src/sass/main.scss";

import Landing from "./pages/landing.jsx/Landing";
import SignIn from "./pages/signIn.jsx/SignIn";
import User from "./pages/user.jsx/User";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { getProfile } from "./store/authSlice";

function App() {
// useSelector et useDispatch pour acceder a l'etat global => 'auth'
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
// Effect hook pour récupérer le profil utilisateur si l'utilisateur est connecté
  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Gestion des routes du site */}
        <Route path="/" element={<Landing />} />
        <Route path="/signIn" element={<SignIn />} />
        {isLoggedIn ? (
          <Route path="/user" element={<User />} />
        ) : (
          <Route path="/user" element={<Navigate to="/signIn" />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

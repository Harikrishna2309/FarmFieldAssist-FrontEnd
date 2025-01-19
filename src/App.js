import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import AddWork from "./pages/AddWork";
import LabourHome from "./pages/LabourHome";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/userhome" element={<UserHome/>}/>
        <Route path="/add-work" element={<AddWork/>}/>
        <Route path="/labourhome" element={<LabourHome/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

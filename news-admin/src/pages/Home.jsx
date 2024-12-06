import React from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import "../static/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-sidebar">
        <Sidebar />
      </div>
      <div className="home-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;

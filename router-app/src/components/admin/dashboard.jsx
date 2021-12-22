import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "./sidebar";

const Dashboard = ({ match }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Sidebar />

      <Outlet />
    </div>
  );
};

export default Dashboard;

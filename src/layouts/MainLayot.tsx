import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MainLayot: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div className="wrapper">
      {pathname !== "/login" &&
        pathname !== "/register" &&
        pathname !== "/order" && <Header />}

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayot;

import NavBarComponent from "@/components/NavBarComponent";
import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <header>
        <NavBarComponent />
      </header>
      <div>
        <Outlet />
      </div>
      <footer></footer>
    </>
  );
};

export default MainLayout;

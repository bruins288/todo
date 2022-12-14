import React from "react";
import { Outlet } from "react-router-dom";

import "./Layout.scss";

function Layout() {
  return (
    <main className="todo">
      <Outlet />
    </main>
  );
}

export default Layout;

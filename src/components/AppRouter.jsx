import React from "react";
import { Route, Routes } from "react-router-dom";

import AppTodo from "../pages/AppTodo";
import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/lists" element={<AppTodo />} />
        <Route path="/lists/:id" element={<AppTodo />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;

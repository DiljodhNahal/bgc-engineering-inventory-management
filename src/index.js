import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Create from "./pages/Create";
import EquipmentInfo from "./pages/EquipmentInfo";
import ManageUser from "./pages/ManageUser";

import Manage from "./pages/Manage";
import SignedOutItems from "./pages/SignedOutItems";
import Requests from "./pages/Requests";
import Announcement from "./pages/Announcement";
import DeleteAnnounce from "./pages/DeleteAnnounce";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [authentication, setAuthentication] = useState();

  useEffect(() => {
    fetch(`/api/autheticated`)
      .then((response) => response.json())
      .then((data) => {
        setAuthentication(data);
      })
      .then(() => {
        setLoaded(true);
      });
  }, []);

  if (!loaded) return null;

  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"search"} element={<Search />} />
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"auth"} element={<Auth />} />
          <Route path={"signup"} element={<SignUp />} />
          <Route path={"create"} element={<Create />} />
          <Route path={"manageuser"} element={<ManageUser />} />
          <Route path={"manage/:id"} element={<Manage />} />
          <Route path={"signedoutitems"} element={<SignedOutItems />} />
          <Route
            path={"info/:id"}
            element={<EquipmentInfo authentication={authentication} />}
          />
          <Route path={"requests"} element={<Requests />} />
          <Route path={"announcements"} element={<Announcement />} />
          <Route path={"announcement"} element={<DeleteAnnounce />} />
        </Route>
        <Route path={"/error/:code"} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

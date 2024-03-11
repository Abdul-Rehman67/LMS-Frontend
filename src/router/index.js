import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CheckOut from "../pages/CheckOut";



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import PrivateRoute from "./privateRoutes";
import CheckIn from "../pages/CheckIn";

function Navigator() {
  const login = localStorage.getItem("isAuthenticated");



  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Dashboard />}></Route>

          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<CheckOut />} path="/checkout/:id" />
          <Route element={<CheckIn />} path="/checkin/:id" />


        </Routes>
      </Router>
    </>
  );
}

export default Navigator;

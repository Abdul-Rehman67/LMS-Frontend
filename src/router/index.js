import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import PrivateRoute from "./privateRoutes";

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

        </Routes>
      </Router>
    </>
  );
}

export default Navigator;

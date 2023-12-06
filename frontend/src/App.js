import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Parent from "./component/Panel/Parent";
import { loadUser } from "./action/userAction";
import Home from "./component/home/Home";

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.loadUser
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Login />} />
        <Route path="/dashboard" element={<Parent />} />
      </Routes>
    </Router>
  );
};

export default App;

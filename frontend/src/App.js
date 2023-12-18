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

  // const PrivateRoute = ({ element, ...rest }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login  isAuthenticated={isAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Parent />} />

        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} isUser={user}>
              <Parent />
            </PrivateRoute>
          }
        /> */}

        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

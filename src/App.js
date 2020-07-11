import React, { useEffect } from "react";
import "antd/dist/antd.css";
import NotFound from "./components/common/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import User from "./pages/User";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminRoute from "./components/Route";
import { userActions } from "./actions/userActions";

const App = () => {
  const user = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route path="/auth" component={Login} />
          <AdminRoute user={user.user} path="/contact" component={Contact} />
          <AdminRoute user={user.user} path="/blog" component={Blog} />
          <AdminRoute user={user.user} path="/user" component={User} />
          <AdminRoute user={user.user} path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </BrowserRouter>
  );
};
export default App;

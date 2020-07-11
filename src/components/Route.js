import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, user, ...rest }) => {
    const users = useSelector((state) => state.userReducer);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!users.isAuthenticated) {
                    return <Redirect to="/auth"></Redirect>;
                } else if (!users) {
                    return <Redirect to="/auth"></Redirect>;
                } else return <Component {...rest} {...props}></Component>;
            }}
        ></Route>
    );
};

export default AdminRoute;
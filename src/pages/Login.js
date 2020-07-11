import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions/userActions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const Auth = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.isAuthenticated === true) setIsAuthenticated(true);
  }, [users.isAuthenticated]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (users && users.error && typeof users.error === "string") {
      message.error(users.error);
    }
  }, [users]);

  const handleOnSubmit = () => {
    dispatch(userActions.login(formData));
  };

  const handleOnSubmitFailed = (errorInfo) => {
    message.error("Please fill out all required field!", errorInfo);
  };
  if (isAuthenticated === true) {
    return <Redirect to="/"></Redirect>;
  } else {
    return (
      <div className="login">
        <div className="login-form">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleOnSubmit}
            onFinishFailed={handleOnSubmitFailed}
          >
            <h2 className="text-center">Login</h2>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                placeholder="username"
                className="input"
                name="username"
                id="username"
                value={username}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="password"
                className="input"
                name="password"
                id="password"
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="input">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
};

export default Auth;

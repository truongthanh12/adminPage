import React from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Link, } from "react-router-dom";
import { Menu, Badge, Dropdown } from "antd";

import {
  DownOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  LogoutOutlined,

} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../actions/userActions";

const HeaderNav = () => {
  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch(userActions.logout())
  }
  const menu = (
    <Menu className="menu-avatar">
      <Menu.Item key="32">
        <a className="avatar-item">
          <SettingOutlined className="i-item-avatar" />
          Setting
        </a>
      </Menu.Item>
      <Menu.Item key="23">
        <a className="avatar-item">
          <InfoCircleOutlined className="i-item-avatar" />
          Profile
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="21">
        <span className="avatar-item">
          <Link to="/auth" onClick={handleOnclick}>
            <LogoutOutlined className="i-item-avatar" />
            Log out
          </Link>
        </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="navbar">
      <div className=" col-md-3 col-sm-3 logo">
        <img
          src={process.env.PUBLIC_URL + "/img/logo1.png"}
          alt="logo website"
        />
      </div>
      <div className="col-md-9 col-sm-9 right-logo">
        <form
          id="custom-search-form"
          className="form-search form-horizontal pull-right"
        >
          <div className="input-append span12">
            <input
              type="text"
              className="search-query"
              placeholder="Search..."
            />
            <button type="submit" className="btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <div className="badge">
          <Badge count={5} className="badge-item">
            <i className="fa fa-envelope"></i>
          </Badge>
          <Badge count={5}>
            <i className="fa fa-envelope"></i>
          </Badge>
        </div>
        <div className="avatar">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {users.user.username}
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;

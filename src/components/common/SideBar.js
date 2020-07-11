import React from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import {
    DesktopOutlined,
    PieChartOutlined,
    ContactsOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const SideBar = (props) => {
    return (

        <Sider collapsible breakpoint="md">
            <Menu theme="dark" defaultSelectedKeys={props.active} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link to="/">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    <Link to="/blog">Blog</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ContactsOutlined />}>
                    <Link to="/contact">Contact</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                    <Link to="/user">User</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default SideBar;

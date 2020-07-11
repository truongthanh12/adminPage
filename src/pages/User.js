
import React from 'react'
import HeaderNav from '../components/common/Header'
import SideBar from '../components/common/SideBar'
import User from '../components/user/User'
import { Layout } from "antd";
const { Content } = Layout;

function user(props) {
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <SideBar active={["4"]}></SideBar>
                <Layout className="site-layout">
                    <HeaderNav></HeaderNav>
                    <Content className="content-layout">
                        <div className="site-layout-background">
                            <User></User>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}


export default user


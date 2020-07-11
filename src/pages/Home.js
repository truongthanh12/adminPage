import React from 'react'
import HeaderNav from '../components/common/Header'
import SideBar from '../components/common/SideBar'
import DashBoard from '../components/home/DashBoard'
import { Layout } from "antd";
const { Content } = Layout;

function home() {
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <SideBar active={["1"]}></SideBar>
                <Layout className="site-layout">
                    <HeaderNav></HeaderNav>
                    <Content className="content-layout">
                        <div className="site-layout-background">
                            <DashBoard></DashBoard>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )

}

export default home


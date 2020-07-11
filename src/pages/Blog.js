

import React from 'react'
import HeaderNav from '../components/common/Header'
import SideBar from '../components/common/SideBar'
import Blog from '../components/blog/Blog'
import { Layout, } from "antd";
const { Content } = Layout;

function blog(props) {
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <SideBar active={["2"]}></SideBar>
                <Layout className="site-layout">
                    <HeaderNav></HeaderNav>
                    <Content className="content-layout">
                        <div className="site-layout-background">
                            <Blog></Blog>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default blog



import React from 'react'
import HeaderNav from '../components/common/Header'
import SideBar from '../components/common/SideBar'
import Contact from '../components/contact/Contact'
import { Layout } from "antd";
const { Content } = Layout;

function contact(props) {
    return (
        <div>
            <Layout style={{ minHeight: "100vh" }}>
                <SideBar active={["3"]}></SideBar>
                <Layout className="site-layout">
                    <HeaderNav></HeaderNav>
                    <Content className="content-layout">
                        <div className="site-layout-background">
                            <Contact></Contact>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default contact

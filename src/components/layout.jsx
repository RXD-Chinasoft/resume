import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './home';
import Charts from './charts'

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: Home,
    },
    {
        path: "/chart",
        sidebar: Charts
    }
];
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Router>
                <Layout>
                    <Header style={{ background: 'black', padding: 0 }} />
                    <Layout style={{ minHeight: '100vh' }}>

                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <Menu.Item key="1">
                                    <Link to="/"><Icon type="home" />
                                        <span>首页</span></Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/chart"><Icon type="pie-chart" />
                                        <span>报表</span></Link>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={<span><Icon type="setting" /><span>管理</span></span>}
                                >
                                    <Menu.Item key="11"><Link to="/chart">需求</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout>

                            <Content style={{ margin: '0 16px' }}>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.sidebar}
                                    />
                                ))}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default SiderDemo
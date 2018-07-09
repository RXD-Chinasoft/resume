import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './../home/home';
import Charts from './../charts/charts';
import WrappedAdvancedSearchForm from './../managements/requirement';
import SiderBar from './siderbar';

import Header from './header'

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: Home,
    },
    {
        path: "/chart",
        sidebar: Charts
    },
    {
        path: "/newRequirement",
        sidebar: WrappedAdvancedSearchForm
    }
];
const { Content, Footer, Sider } = Layout;

class MainPage extends React.Component {
    render() {
        return (
            <Layout>
                <Header />
                <Router>
                    <Layout style={{ minHeight: '100vh' }}>

                        <SiderBar />
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
                </Router>
            </Layout>
        );
    }
}

export default MainPage
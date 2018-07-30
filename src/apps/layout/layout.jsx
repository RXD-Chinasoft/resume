import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './../home/home';
import Charts from './../charts/charts';
import ChartProductAnlysis from './../charts/chartProductAnlysis';
import ChartResultConfiguration from './../charts/chartResultConfig';
import ChartResumeInterviewTrace from './../charts/chartResumeInterviewTrace';
import ChartRequirement from './../charts/chartRequirement';
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
        path: "/chartProductAnlysis",
        sidebar: ChartProductAnlysis
    },
    {
        path: "/chartResultConfig",
        sidebar: ChartResultConfiguration
    },
    {
        path: "/chartResumeInterviewTrace",
        sidebar: ChartResumeInterviewTrace
    },
    {
        path: "/chartRequirement",
        sidebar: ChartRequirement
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

                            <Content style={{ marginLeft: '16px' }}>
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
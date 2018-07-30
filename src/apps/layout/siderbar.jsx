import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderBar extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                width={150}
            >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/"><Icon type="home" />
                            <span>首页</span></Link>
                    </Menu.Item>
                    {/* <Menu.Item key="2">
                        <Link to="/chart"><Icon type="pie-chart" />
                            <span>报表</span></Link>
                    </Menu.Item> */}
                    <SubMenu
                        key="chart"
                        title={<span><Icon type="pie-chart" /><span>报表</span></span>}
                    >
                        <Menu.Item key="chart1"><Link to="/chartProductAnlysis">产品分析</Link></Menu.Item>
                        <Menu.Item key="chart2"><Link to="/chartResultConfig">结果配置</Link></Menu.Item>
                        <Menu.Item key="chart3"><Link to="/chartResumeInterviewTrace">简历/面试 跟踪</Link></Menu.Item>
                        <Menu.Item key="chart4"><Link to="/chartRequirement">缺口/需求 跟踪</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="setting" /><span>管理</span></span>}
                    >
                        <Menu.Item key="11"><Link to="/newRequirement">需求</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SiderBar
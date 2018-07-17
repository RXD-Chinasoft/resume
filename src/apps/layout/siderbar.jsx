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
                        <Menu.Item key="11"><Link to="/newRequirement">需求</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SiderBar
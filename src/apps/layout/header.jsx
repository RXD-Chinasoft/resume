import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Header extends React.Component {


    render() {
        return (
            <div style={{ background: 'black', padding: 0, minHeight: 50 }}>
                <Row style={{height: 50}}>
                    <Col style={{height:'100%'}} span={8}><span style={{color:'white'}}>Spectacular</span></Col>
                    <Col style={{height:'100%'}} span={8} offset={8}><span style={{color:'white'}}>col-8</span></Col>
                </Row>
            </div>
        );
    }
}

export default Header
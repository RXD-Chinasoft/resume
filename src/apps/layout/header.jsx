import React, { Component } from 'react';
import { Row, Col, Button, Icon, Badge } from 'antd';

class Header extends React.Component {

    render() {
        return (
            // <div style={{ background: 'black', padding: 0, minHeight: 50 }}>
            //     <Row style={{ height: 50 }}>
            //         <Col style={{ height: '100%' }} span={6}><span style={{ color: 'white' }}>Spectacular</span></Col>
            //         <Col style={{ height: '100%' }} span={6}>
            //             <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Icon type="user" style={{ fontSize: 20, color: '#fff' }} /><span style={{ color: 'white' }}>user</span></span>
            //             <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Badge count={5}><Icon type="mail" style={{ fontSize: 20, color: '#fff' }} /></Badge></span>
            //             <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Badge count={5}><Icon type="notification" style={{ fontSize: 20, color: '#fff' }} /></Badge></span>
            //         </Col>
            //     </Row>
            // </div>
            <div style={{ background: 'black', padding: 0, minHeight: 50 }}>

                <div style={{  float: 'left', color: 'white', paddingTop:10 }}>Spectacular</div>
                <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Icon type="user" style={{ fontSize: 20, color: '#fff' }} /><span style={{ color: 'white' }}>user</span></span>
                <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Badge count={5}><Icon type="mail" style={{ fontSize: 20, color: '#fff' }} /></Badge></span>
                <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Badge count={5}><Icon type="notification" style={{ fontSize: 20, color: '#fff' }} /></Badge></span>
            </div>
        );
    }
}

export default Header
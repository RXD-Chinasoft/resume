import React, { Component } from 'react';
import { Row, Col, Button, Icon, Badge, Popover } from 'antd';

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
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
            <div style={{ background: '#14539d', padding: 0, minHeight: 50 }}>

                <div style={{ float: 'left', color: 'white', paddingLeft: 10, fontSize: 27 }}>Spectacular</div>
                <span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Icon type="user" style={{ fontSize: 20, color: '#fff' }} /><span style={{ color: 'white' }}>user</span></span>
                <Popover placement="bottomLeft" content={content} title="Title" trigger="click"><span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Badge count={5}><Icon type="mail" style={{ fontSize: 20, color: '#fff' }} /></Badge></span></Popover>
                <Popover placement="bottomLeft" content={content} title="Title" trigger="click"><span style={{ float: 'right', marginRight: 15, paddingTop: 10 }}><Badge count={5}><Icon type="notification" style={{ fontSize: 20, color: '#fff' }} /></Badge></span></Popover>
            </div>
        );
    }
}

export default Header
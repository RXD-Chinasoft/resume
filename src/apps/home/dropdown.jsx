import { Menu, Dropdown, Button, Icon, message } from 'antd';
import React, { Component, select } from 'react';


// function handleButtonClick(e) {
//     message.info('Click on left button.');
//     console.log('click left button', e);
// }
// function handleMenuClick(e) {
//     message.info('Click on menu item.', e);
//     console.log('click', e);
// }

// const menu = (
//     <Menu onClick={handleMenuClick}>
//         <Menu.Item key="1">1st menu item</Menu.Item>
//         <Menu.Item key="2">2nd menu item</Menu.Item>
//         <Menu.Item key="3">3rd item</Menu.Item>
//     </Menu>
// );

class DropDownButton extends React.Component {
    constructor(props) {
        super(props);
        this.items = [{ id: 1, value: "1st menu item" }, { id: 2, value: "2st menu item" }, { id: 3, value: "3st menu item" }]
        this.menu = <Menu onClick={this.handleMenuClick}>
            {this.items.map((item, index) => {
                return <Menu.Item key={index}>{item.value}</Menu.Item>
            })}
        </Menu>
        this.state = { current: '请选择所属部门' };
    }
    handleMenuClick = (e) => {
        // message.info('Click on menu item.', e);
        console.log('click', e, this.items);
        this.setState({ current: this.items[Number(e.key)].value })
    }
    render() {
        return (
            <div>
                <Dropdown overlay={this.menu}>
                    <Button style={{ width: '200px' }}>
                        {this.state.current}<Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
    // constructor(props) {
    //     super(props);
    //     this.state = { value: 'value1' };
    //     this.handleChange = this.handleChange.bind(this);
    // }
    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }
    // render() {
    //     return (
    //         <div>
    //             <label placeholder="请输入地域" >所属部门
    //                 <select value={this.state.value} onChange={this.handleChange} style={{ marginLeft: '19px', width: '145px' }}>
    //                     <option value="value1">大连</option>
    //                     <option value="value2">北京</option>
    //                     <option value="value3">上海</option>
    //                 </select>
    //             </label>
    //             {/* <div>chosen: {this.state.value}</div> */}
    //         </div>
    //     )
    // }


}

export default DropDownButton;



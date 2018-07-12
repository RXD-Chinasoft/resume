import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Cascader, InputNumber } from 'antd';
import DropDownButton from './dropdown'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const RequirementCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          // title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          width={"90%"}
        >
          <div className="backgroundColor">
            <Row>
              <Col className="gutter-row" span={18}>
                <Col className="gutter-row" span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="需求ID"
                    hasFeedback
                    validateStatus="success3"
                    style={{ color: 'white' }}
                  >
                    <Input placeholder="请输入职位名称" id="success3" style={{ width: '200px' }} />
                  </FormItem>
                </Col>
                <Col className="gutter-row" span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="地域"
                    hasFeedback
                    validateStatus="success1"
                    style={{ color: 'white' }}
                  >
                    <Input placeholder="请输入地域" id="success1" />
                  </FormItem>
                </Col>

                <Col className="gutter-row" span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="人数"
                    hasFeedback
                    validateStatus="success2"
                    style={{ color: 'white' }}
                  >
                    <Input placeholder="请输入人数" id="success2" />
                  </FormItem>
                </Col>
              </Col>
              <Col className="gutter-row" span={6}>
                <h2 style={{ color: 'white' }}>{moment(new Date()).format("YYYY-MM-DD")}</h2>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '15px', width: '100%' }}>
              <Col className="gutter-row" span={14}>
                <Col className="gutter-row" span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="客户需求ID"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入职位名称" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="销售负责人"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="优先度"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="需求类型"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="客户"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入客户名称" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="挑战目标"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入挑战目标" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="客轮面试"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入客面轮次" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="面试联系人"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入面试联系人" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>


                </Col>
                <Col className="gutter-row" span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="所属部门"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">部门 1</Option>
                      <Option value="2">部门 2</Option>
                      <Option value="3">部门 3</Option>
                    </Select>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="交付负责人"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="英语"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="需求状态"
                    hasFeedback
                    validateStatus="error1"
                  >
                    <Select defaultValue="1" style={{ width: '200px', marginLeft: '10px' }}>
                      <Option value="1">Option 1</Option>
                      <Option value="2">Option 2</Option>
                      <Option value="3">Option 3</Option>
                    </Select>
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="薪资"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入薪资范围" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="周简历目标"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入目标" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="团队规模"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入规模" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="联系人电话"
                    hasFeedback
                    validateStatus="success2"
                  >
                    <Input placeholder="请输入电话" id="success2" style={{ width: '200px', marginLeft: '10px' }} />
                  </FormItem>
                </Col>
              </Col>


              <Row>
                <Col className="gutter-row" span={14}>
                  <Col className="gutter-row" span={10}>
                    <FormItem
                      {...formItemLayout}
                      label="面试地址"
                      hasFeedback
                      validateStatus="success2"
                    >
                      <Input placeholder="请输入面试地址" id="success2" style={{ width: '550px', marginLeft: '20px' }} />
                    </FormItem>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col className="gutter-row" span={14}>
                  <Col className="gutter-row" span={10}>
                    <FormItem
                      {...formItemLayout}
                      label="项目地址"
                      hasFeedback
                      validateStatus="success2"
                    >
                      <Input placeholder="请输入项目地址" id="success2" style={{ width: '550px', marginLeft: '20px' }} />
                    </FormItem>
                  </Col>
                </Col>
              </Row>

              <Col className="gutter-row" span={10}>

              </Col>
            </Row>

          </div>


          {/* <div style={{ background: 'blue' }}>
            <div>
              <Row>
                <label className="titleBox" style={{ color: 'white' }} >需求ID</label>
                <input placeholder="请输入职位名称" className="titleBox" />
                <label className="titleBox" style={{ color: 'white' }} >地域</label>
                <input placeholder="请输入地域" className="titleBox" />
                <label className="titleBox" style={{ color: 'white' }}> 人数</label>
                <input placeholder="请输入人数" className="titleBox" />
              </Row>
            </div>

            <div>
              <Row gutter={16} style={{ marginTop: '30px', width: '100%' }}>
                <Col className="gutter-row" span={14}>
                  <Col className="gutter-row" span={12}>
                    <Row>
                      <Col className="gutter-row" span={6}><label className="content" style={{ color: 'white', marginTop: 10 }}>客户需求ID</label></Col>
                      <Col className="gutter-row" span={6}><Input placeholder="请输入职位名称" style={{ width: 200 }} /></Col>
                    </Row>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Row>
                      <Col className="gutter-row" span={6}><label style={{ color: 'white', marginTop: 10 }}>所属部门</label></Col>
                      <Col className="gutter-row" span={6}><DropDownButton>
                      </DropDownButton></Col>
                    </Row>
                  </Col>
                </Col>
                <Col className="gutter-row" span={10}>

                </Col>
              </Row>

            </div>
          </div> */}

          {/* <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form> */}
        </Modal >
      );
    }
  }
);

export default RequirementCreateForm;

// class CollectionsPage extends React.Component {
//   state = {
//     visible: false,
//   };

//   showModal = () => {
//     this.setState({ visible: true });
//   }

//   handleCancel = () => {
//     this.setState({ visible: false });
//   }

//   handleCreate = () => {
//     const form = this.formRef.props.form;
//     form.validateFields((err, values) => {
//       if (err) {
//         return;
//       }

//       console.log('Received values of form: ', values);
//       form.resetFields();
//       this.setState({ visible: false });
//     });
//   }

//   saveFormRef = (formRef) => {
//     this.formRef = formRef;
//   }

//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>New Collection</Button>
//         <RequirementCreateForm
//           wrappedComponentRef={this.saveFormRef}
//           visible={this.state.visible}
//           onCancel={this.handleCancel}
//           onCreate={this.handleCreate}
//         />
//       </div>
//     );
//   }
// }
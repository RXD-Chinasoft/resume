import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Cascader, InputNumber } from 'antd';
import DropDownButton from './dropdown'
import moment from 'moment';
import './newform.css'

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
    handleSelectChange = (value) => {
      console.log('chooseValue', value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }

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
          <Form
            className="ant-advanced-search-form root"
            onSubmit={this.handleCreate}
            // style={{ background: "#186dd6", paddingTop: 10, marginRight: 18, marginLeft: 18, color: "white" }}
          >
            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col className="gutter-row" span={18}>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    {...formItemLayout}
                    label="需求ID"
                    style={{ color: "white" }}
                  >
                    {getFieldDecorator('requirement', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入需求ID" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>
                </Col>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    {...formItemLayout}
                    label="地域"
                    style={{ color: "white" }}
                  >
                    {getFieldDecorator('area', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入地域" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>
                </Col>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    {...formItemLayout}
                    label="人数"
                    style={{ color: "white" }}
                  >
                    {getFieldDecorator('count', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入人数" style={{ width: '200px', marginLeft: '34px' }} />
                    )}
                  </FormItem>
                </Col>
              </Col>
              <Col className="gutter-row" span={6}>
                <h3 style={{ color: 'black', paddingTop: 12, marginLeft: '20px' }}>{moment(new Date()).format("YYYY-MM-DD")}</h3>
              </Col>
            </Row>



            <Row gutter={24}>
              <Col span={14} style={{ paddingTop: 8 }}>
                <Col span={12} style={{ paddingTop: 8 }}>
                  <FormItem
                    {...formItemLayout}
                    label="客户需求ID"
                  >
                    {getFieldDecorator('requirementID', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: false, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入客户需求ID" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>

                  <FormItem
                    label="销售负责人"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('saler', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">销售负责人1</Option>
                        <Option value="2">销售负责人2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="优先度"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('priority', {
                      rules: [{ required: false, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">优先度1</Option>
                        <Option value="2">优先度2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="需求类型"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('rqtype', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">需求类型1</Option>
                        <Option value="2">需求类型2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="客户"
                  >
                    {getFieldDecorator('client', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入客户姓名" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="挑战目标"
                  >
                    {getFieldDecorator('challengetarget', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入挑战目标" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>

                  <FormItem
                    label="客轮面试"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('turn', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">客轮面试1</Option>
                        <Option value="2">客轮面试2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="面试联系人"
                  >
                    {getFieldDecorator('candidate', {
                      rules: [
                        // {
                        //   type: 'email', message: 'The input is not valid E-mail!',
                        // },
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入面试联系人" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>

                </Col>
                <Col span={12} style={{ paddingTop: 5 }}>
                  <FormItem
                    label="所属部门"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('department', {
                      rules: [{ required: false, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">部门1</Option>
                        <Option value="2">部门2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="交付负责人"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('dm', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">交付负责人1</Option>
                        <Option value="2">交付负责人2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="英语"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('english', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">四级</Option>
                        <Option value="2">六级</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label="需求状态"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('rqstatus', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                        style={{ width: '200px', marginLeft: '20px' }}
                      >
                        <Option value="1">需求状态1</Option>
                        <Option value="2">需求状态2</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="薪资"
                  >
                    {getFieldDecorator('salaryscope', {
                      rules: [
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入薪资范围" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="周简历目标"
                  >
                    {getFieldDecorator('resumetarget', {
                      rules: [
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入目标" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="团队规模"
                  >
                    {getFieldDecorator('teamrange', {
                      rules: [
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入规模" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="联系人电话"
                  >
                    {getFieldDecorator('contact', {
                      rules: [
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入联系人电话" style={{ width: '200px', marginLeft: '34px' }} />
                    )}

                  </FormItem>
                </Col>
              </Col>

              <Col span={10} style={{ paddingTop: 8 }}>
                <div style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5, paddingBottom: 8, backgroundColor: 'white', width: '90%' }}>

                </div>
              </Col>
            </Row>

            <Row>
              <Col className="gutter-row" span={14}>
                <Col className="gutter-row" span={10}>
                  <FormItem
                    {...formItemLayout}
                    label="面试地址"
                    hasFeedback
                  >
                    {getFieldDecorator('interviewaddr', {
                      rules: [
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入面试地址" style={{ width: '540px', marginLeft: '44px' }} />
                    )}

                  </FormItem>
                </Col>
              </Col>
            </Row>
            <Row style={{ borderBottom: "solid 1px white" }}>
              <Col className="gutter-row" span={14}>
                <Col className="gutter-row" span={10}>
                  <FormItem
                    {...formItemLayout}
                    label="项目地址"
                    hasFeedback
                  >
                    {getFieldDecorator('projectaddr', {
                      rules: [
                        {
                          required: true, message: 'Please input your name!',
                        }],
                    })(
                      <Input placeholder="请输入项目地址" style={{ width: '540px', marginLeft: '44px' }} />
                    )}

                  </FormItem>
                </Col>
              </Col>
            </Row>
          </Form>



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
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Upload, Icon } from 'antd';
import DropDownButton from './dropdown'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Search = Input.Search;

const CandidateCreateForm = Form.create()(
  class extends React.Component {

    handleSelectChange = (value) => {
      console.log(value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }

    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }
  

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 1 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 5 },
          sm: { span: 18 },
        },
      };
      return (
        <Modal
          visible={visible}
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          width={"90%"}
        >
          <Form
            className="ant-advanced-search-form"
            // onSubmit={this.handleCreate}
            style={{ background: "#186dd6", paddingTop: 10, marginRight: 18, marginLeft: 18, color: "white" }}
          >
            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="需求ID"
                  style={{ color: "white" }}
                >
                  {getFieldDecorator('name', {
                    rules: [
                      // {
                      //   type: 'email', message: 'The input is not valid E-mail!',
                      // },
                      {
                        required: true, message: 'Please input your name!',
                      }],
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={8} style={{ paddingTop: 8 }}>
                <span>职位</span>
              </Col>
            </Row>

            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col span={8} style={{ paddingTop: 8 }}>
                <FormItem
                  label="招聘负责人"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('zhaopin', {
                    rules: [{ required: true, message: 'Please select one!' }],
                  })(
                    <Select
                      placeholder="Select a option"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="1">招聘负责人1</Option>
                      <Option value="2">招聘负责人2</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8} style={{ paddingTop: 8 }}>
                <FormItem
                  label="销售负责人"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('xiaoshou', {
                    rules: [{ required: true, message: 'Please select one!' }],
                  })(
                    <Select
                      placeholder="Select a option"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="1">销售负责人1</Option>
                      <Option value="2">销售负责人2</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8} style={{ paddingTop: 8 }}>
                <FormItem
                  label="交付负责人"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('jiaofu', {
                    rules: [{ required: true, message: 'Please select one!' }],
                  })(
                    <Select
                      placeholder="Select a option"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="1">交付负责人1</Option>
                      <Option value="2">交付负责人2</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col span={8} style={{ paddingTop: 8 }}>
                <FormItem
                  label="当前状态"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: 'Please select one!' }],
                  })(
                    <Select
                      placeholder="Select a option"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="1">前状态1</Option>
                      <Option value="2">dang前状态2</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8} style={{ paddingTop: 8 }}>
                <FormItem
                  label="风险等级"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                >
                  {getFieldDecorator('risk', {
                    rules: [{ required: true, message: 'Please select one!' }],
                  })(
                    <Select
                      placeholder="Select a option"
                      onChange={this.handleSelectChange}
                    >
                      <Option value="1">asdfasdf</Option>
                      <Option value="2">fddddd</Option>
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col span={24} style={{ paddingTop: 8 }}>
                <FormItem
                  label="描述"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 20 }}
                >
                  {getFieldDecorator('describe', {
                    rules: [{ required: true, message: 'Please input one!' }],
                  })(
                    <TextArea rows={4} />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col span={24} style={{ paddingTop: 8 }}>
                <FormItem
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 20 }}
                  label="Upload"
                >
                  {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    // rules: [{ required: true, message: 'Please choose one!' }],
                  })(
                    <Upload name="logo" listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
              </Button>
                    </Upload>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
              <Col span={24} style={{ paddingTop: 8 }}>
                <FormItem
                  label="留言"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 20 }}
                >
                  {getFieldDecorator('msg', {
                    rules: [{ required: true, message: 'Please input one!' }],
                  })(
                    <TextArea rows={4} />
                    )}
                </FormItem>
              </Col>
            </Row>

          </Form>
        </Modal>
      );
    }
  }
);

export default CandidateCreateForm;

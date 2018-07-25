import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Upload, Icon, DatePicker } from 'antd';
import DropDownButton from './dropdown';
import './newform.css';
import { CreateCandidateWithForm } from './../service/homeService'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Search = Input.Search;

const CandidateCreateForm = Form.create()(
  class extends React.Component {

    state = {
      visible: false,
      loading: false,
      fileList: [],
    }
    // for model
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    handleOk = (e) => {
      this.setState({ loading: true });
      // setTimeout(() => {
      //   this.setState({ loading: false, visible: false });
      // }, 3000);
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          CreateCandidateWithForm(this.formDataFromForm(values));
        }
      });
    }
    handleCancel = () => {
      this.setState({ visible: false });
    }

    // for form
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

    // commit
    formDataFromForm = (values) => {
      console.log('Received values of form: ', values);
      let formData = new FormData()
      formData.append('requirement', 1)
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const value = values[key];
          if (key !== 'upload') {
            formData.append(key, value)
          } else {
            this.state.fileList.forEach((file) => {
              formData.append('files[]', file);
            });
          }
        }
      }
      console.log(formData)
      return formData
    }

    render() {
      const { onCancel, onCreate, form } = this.props;
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
      const { visible, loading } = this.state;
      return (
        <div>
          {/* <Button type="primary" onClick={this.showModal}>
            Open
          </Button> */}
          <Button type="primary" shape="circle" icon="user-add" size={'small'} onClick={this.showModal} />
          <Modal
            visible={visible}
            // okText="Create"
            onCancel={this.handleCancel}
            // onOk={onCreate}
            width={"90%"}
            footer={[
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="save" icon="save" loading={loading} onClick={this.handleOk}>
                保存
              </Button>,
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="copy" icon="copy" onClick={this.handleCancel}>复制</Button>,
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="del" icon="delete" onClick={this.handleCancel}>删除</Button>,
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="trace" icon="rollback" onClick={this.handleCancel}>轨迹</Button>,
            ]}
          >
            <Form
              className="ant-advanced-search-form root"
            >
              <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="需求ID"
                    style={{ color: "black" }}
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
                      <Input />
                      )}
                  </FormItem>
                </Col>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <span>职位</span>
                </Col>
                <Col span={8} style={{ paddingTop: 8, textAlign: 'right' }}>
                  <span>2018/02/08</span>
                </Col>
              </Row>

              {/* line2 */}
              <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    label="招聘负责人"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('hiringmanager', {
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
                    {getFieldDecorator('saler', {
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
                    {getFieldDecorator('dm', {
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

              {/* line3 */}
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
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    label="面试时间"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('interviewtime', {
                      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                    })(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                      )}
                  </FormItem>
                </Col>
              </Row>

              {/* line4 */}
              <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    label="报价"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('price', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Input />
                      )}
                  </FormItem>
                </Col>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    label="GP"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('gp', {
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Input />
                      )}
                  </FormItem>
                </Col>
                <Col span={8} style={{ paddingTop: 8 }}>
                  <FormItem
                    label="入职时间"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator('takeintime', {
                      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                    })(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
                      valuePropName: 'files',
                      getValueFromEvent: this.normFile,
                      // rules: [{ required: true, message: 'Please choose one!' }],
                    })(
                      <Upload name="logo" listType="picture"
                        beforeUpload={(file) => {
                          this.setState(({ fileList }) => ({
                            fileList: [...fileList, file],
                          }));
                          return false;
                        }}
                        onRemove={(file) => {
                          this.setState(({ fileList }) => {
                            const index = fileList.indexOf(file);
                            const newFileList = fileList.slice();
                            newFileList.splice(index, 1);
                            return {
                              fileList: newFileList,
                            };
                          });
                        }}
                        fileList={this.state.fileList}
                        multiple={false}
                      >
                        <Button>
                          <Icon type="upload" /> Choose File
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
        </div>

      );
    }
  }
);

export default CandidateCreateForm;

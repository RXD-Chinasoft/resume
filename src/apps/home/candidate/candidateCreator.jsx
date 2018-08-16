import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Upload, Icon, notification, DatePicker } from 'antd';
import './../newform.css';
import { CreateCandidateWithForm } from './../../service/homeService';
import { OpenNotificationWithIcon } from './../../service/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Search = Input.Search;
const mapping = [
  [{ id: 10, name: "未内筛" }, { id: 11, name: "内筛通过" }, { id: 12, name: "内筛失败" }],
  [{ id: 20, name: "未安排内面" }, { id: 21, name: "已安排内面" }, { id: 22, name: "已内面" }, { id: 23, name: "内面通过" }, { id: 24, name: "内面失败" }],
  [{ id: 30, name: "未推荐" }, { id: 31, name: "已推荐" }, { id: 32, name: "推荐通过" }, { id: 33, name: "推荐失败" }],
  [{ id: 40, name: "未安排客户面" }, { id: 41, name: "已安排客户面" }, { id: 42, name: "已面客" }, { id: 43, name: "客面通过" }, { id: 44, name: "客面失败" }],
  [{ id: 50, name: "未报价" }, { id: 51, name: "已报价" }, { id: 52, name: "报价通过" }, { id: 53, name: "报价失败" }],
  [{ id: 60, name: "未审批" }, { id: 61, name: "审批中" }, { id: 62, name: "审批通过" }, { id: 63, name: "审批失败" }],
  [{ id: 70, name: "未筛Offer" }, { id: 71, name: "已Offer" }, { id: 72, name: "接受Offer" }, { id: 73, name: "拒绝Offer" }],
  [{ id: 80, name: "未进行" }, { id: 81, name: "进行中" }, { id: 82, name: "检调合格" }, { id: 83, name: "体检审批" }, { id: 84, name: "背调审批" }, { id: 85, name: "体检失败" }, { id: 86, name: "背调失败" }],
  [{ id: 90, name: "等待入职" }, { id: 91, name: "二次审批" }, { id: 92, name: "正常入职" }, { id: 92, name: "入职失败" }]
]
const CandidateCreateForm = Form.create()(
  class extends React.Component {

    state = {
      visible: false,
      loading: false,
      fileList: [],
    }
    // for model
    showModal = () => {
      this.findDictionaries()
      this.setState({
        visible: true,
      });
    }

    findDictionaries = () => {
      if (!this.dictionaries || this.dictionaries.length === 0) {
        try {
          this.dictionaries = JSON.parse(localStorage.getItem('dictionaries'))
        } catch (error) {
          this.dictionaries = []
        }
      }
      console.log("use dictionary = ", this.dictionaries)
    }

    handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({ loading: true });
          CreateCandidateWithForm(this.formDataFromForm(values)).then(res => {
            OpenNotificationWithIcon('success', 'Notification', '创建成功')
            this.onDone();
          }).catch(e => {
            OpenNotificationWithIcon('warning', 'Notification', '创建失败，请联系管理员')
            this.onDone()
          });
        }
      });
    }
    onDone = () => {
      this.setState({ loading: false, visible: false, });
      this.props.form.resetFields();
      if (this.props.onSaveDone) {
        this.props.onSaveDone()
      }
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
      formData.append('requirement', this.props.requirement)
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

    getStatusInitialVal = (cur) => {
      const result = mapping[0].find(ele => {
        return ele.id == cur
      })
      if (result) {
        return result.name
      }
      return ""
    }
    uyouqudou

    getCurrentStatus = () => {
      return (mapping[0].map((e, i) => {
        return <Option key={e.id} value={e.id}>{e.name}</Option>
      }))
    }

    getInitialValFromDics = (key, cur) => {
      const result = this.dictionaries ? this.dictionaries[key].find(e => {
        return e.id === cur
      }) : null
      return result ? result.name : ""
    }

    getOptionsFromDics = (key) => {
      return (this.dictionaries ? this.dictionaries[key].map((e, i) => {
        return <Option key={e.pKey} value={e.id}>{e.name}</Option>
      }) : <Option value=""></Option>)
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
          {/* <Button type="primary" shape="circle" icon="user-add" size={'small'} onClick={this.showModal} /> */}
          <Icon type="user-add" style={{ color: '#347cb7' }} onClick={this.showModal} />
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
              // <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="copy" icon="copy" onClick={this.handleCancel}>复制</Button>,
              // <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="del" icon="delete" onClick={this.handleCancel}>删除</Button>,
              // <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="trace" icon="rollback" onClick={this.handleCancel}>轨迹</Button>,
            ]}
          >
            <Form
              className="ant-advanced-search-form root"
            >
              <Row gutter={24} style={{ borderBottom: "solid 1px white" }}>
                <Col span={8}>
                  <FormItem
                    {...formItemLayout}
                    label="候选人名称"
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
                  <span style={{ paddingLeft: 30, color: 'black' }}>{this.props.position}</span>
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
                        {
                          this.getOptionsFromDics(103)
                        }
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
                        {
                          this.getOptionsFromDics(101)
                        }
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
                        {
                          this.getOptionsFromDics(102)
                        }
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
                        {
                          this.getCurrentStatus()
                        }
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
                        {
                          this.getOptionsFromDics(5)
                        }
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

CandidateCreateForm.propTypes = {
  requirement: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired
}

export default CandidateCreateForm;

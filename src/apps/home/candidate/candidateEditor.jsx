import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Upload, Icon, notification, DatePicker } from 'antd';
import './../newform.css';
import { UpdateCandidateWithForm } from './../../service/homeService';
import { OpenNotificationWithIcon } from './../../service/utils';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Search = Input.Search;
const CandidateEditForm = Form.create()(
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
          UpdateCandidateWithForm(this.formDataFromForm(values)).then(res => {
            OpenNotificationWithIcon('success', 'Notification', '更新成功')
            console.log("UpdateCandidateWithForm", res)
            this.onDone(res.data);
          }).catch(e => {
            console.log("UpdateCandidateWithForm error", e)
            OpenNotificationWithIcon('warning', 'Notification', '更新失败，请联系管理员')
            this.onDone(null)
          });
        }
      });
    }
    onDone = (candidate) => {
      this.setState({ loading: false, visible: false, });
      this.props.form.resetFields();
      if (this.props.onUpdateDone) {
        if (candidate) {
          this.props.onUpdateDone(candidate)
        }
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
      console.log('Received values of form: ', values, this.props.candidate.id);
      let formData = new FormData()
      formData.append('id', this.props.candidate.id)
      formData.append('requirement', this.props.candidate.requirement)
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
      const entity = this.props.candidate;
      console.log('candidateEntity', entity)

      return (
        <div>
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
                      initialValue: entity.candidate,
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
                      initialValue: this.getInitialValFromDics(103, entity.hiringmanager),
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
                      initialValue: this.getInitialValFromDics(101, entity.saler),
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
                      initialValue: this.getInitialValFromDics(102, entity.dm),
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
                      initialValue: this.getInitialValFromDics(4, entity.status),
                    })(
                      <Select
                        placeholder="Select a option"
                        onChange={this.handleSelectChange}
                      >
                        {
                          this.getOptionsFromDics(4)
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
                      initialValue: this.getInitialValFromDics(5, entity.risk),
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
                      initialValue: moment(new Date(entity.interviewtime), 'YYYY-MM-DD HH:mm:ss'),
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
                      initialValue: entity.price,
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
                      initialValue: entity.gp,
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
                      initialValue: moment(new Date(entity.takeintime), 'YYYY-MM-DD HH:mm:ss'),
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
                      initialValue: entity.descrpition,
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
                      initialValue: entity.message,
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

CandidateEditForm.propTypes = {
  candidate: PropTypes.object.isRequired
}

export default CandidateEditForm;

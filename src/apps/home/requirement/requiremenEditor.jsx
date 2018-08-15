import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Cascader, InputNumber, Icon, notification, Checkbox } from 'antd';
import moment from 'moment';
import './../newform.css';
import { UpdateRequirement } from './../../service/homeService';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;
const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['硬性指标', '岗位优势'];

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



const RequirementEditForm = Form.create()(
  class extends React.Component {
    state = {
      visible: false,
      loading: false,
      fileList: [],
      jdObject: [
        { id: 1, value: ['硬性指标', '岗位优势'], name: '1.英语读写熟练' },
        { id: 2, value: ['硬性指标', '岗位优势'], name: '2.沟通能力强' },
        { id: 3, value: ['硬性指标', '岗位优势'], name: '3.不焦虑' }
      ],
    }

    componentDidMount() {
      console.log("====================>", this.props.requirement, this.props.requirement.descrpition)
      if (this.props.requirement.descrpition) {
        let { jdObject } = this.state
        jdObject = JSON.parse(this.props.requirement.descrpition)
        this.setState({ jdObject })
        console.log("====================>", jdObject)
      }
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

    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleSelectChange = (value) => {
      console.log('chooseValue', value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }

    handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
        if (!err) {
          this.setState({ loading: true });
          UpdateRequirement(this.convertFromRq(values)).then(res => {
            openNotificationWithIcon('success', 'Notification', '更新成功')
            console.log("UpdateCandidateWithForm", res)
            this.onDone(res.data);
          }).catch(e => {
            openNotificationWithIcon('warning', 'Notification', '更新失败，请联系管理员');
            this.onDone(null);
          })
          return;
        }
      });
    }
    onDone = (requirement) => {
      this.setState({ loading: false, visible: false, });
      this.props.form.resetFields();
      if (this.props.onRQUpdateDone) {
        if (requirement) {
          this.props.onRQUpdateDone(requirement)//回调函数，参数requirement传至home页onRQUpdateDone方法里最后一个参数
        }
      }
    }

    convertFromRq = (formData) => {
      console.log('formData', formData, this.props.requirement.id)
      return {
        id: this.props.requirement.id,
        requirement: formData.requirement,//需求ID
        area: formData.area,//地域
        count: Number(formData.count),//人数
        saler: Number(formData.saler),//销售负责人
        dm: Number(formData.dm),//交付负责人
        priority: Number(formData.priority),//优先级
        english: Number(formData.english),//英语
        rqtype: Number(formData.rqtype),//需求类型
        rqstatus: Number(formData.rqstatus),//需求状态
        client: formData.client,//客户姓名
        salaryscope: formData.salaryscope,//薪资范围
        challengetarget: formData.challengetarget,//挑战目标
        resumetarget: formData.resumetarget,//周简历目标
        turn: Number(formData.turn),//客面轮次
        teamrange: formData.teamrange,//规模
        candidate: formData.candidate,//面试联系人
        contact: formData.contact,//联系人电话
        interviewaddr: formData.interviewaddr,//面试地址
        projectaddr: formData.projectaddr,//项目地址
        createtime: "20180725",
        descrpition: '',
        matrix: ['', '', '', '', '', '', '', '', ''],
        clientrequirment: "123",
        department: Number(formData.department)//所属部门
      }
    }

    onChange(index, checkedValues) {
      console.log('checked = ', checkedValues, index);
      const { jdObject } = this.state
      jdObject[index].value = checkedValues
      this.setState({ jdObject })
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
      const RadioGroup = Radio.Group;
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

      const entity = this.props.requirement;
      return (
        <div>
          {/* <Button type="primary" shape="circle" icon="plus-circle-o" size={'small'} onClick={this.showModal} /> */}
          <Icon type="form" style={{ color: '#347cb7' }} onClick={this.showModal} />
          <Modal
            visible={visible}
            // title="Create a new collection"
            // okText="Create"
            onCancel={this.handleCancel}
            // onOk={onCreate}
            width={"90%"}
            footer={[
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="save" icon="save" loading={loading} onClick={this.handleOk}>
                保存
            </Button>,
              // <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="copy" icon="copy" onClick={this.handleCancel}>复制</Button>,
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="del" icon="delete" onClick={this.handleCancel}>删除</Button>,
              // <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="trace" icon="rollback" onClick={this.handleCancel}>轨迹</Button>,
            ]}
          >
            <Form
              className="ant-advanced-search-form root"
            // onSubmit={this.handleCreate}
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
                            required: true, message: 'Please input your requirement!',
                          }],
                        initialValue: entity.requirement,
                      })(
                        <Input placeholder="请输入需求ID" style={{ width: 160, marginLeft: '34px' }} />
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
                            required: true, message: 'Please input your area!',
                          }],
                        initialValue: entity.area,
                      })(
                        <Input placeholder="请输入地域" style={{ width: 160, marginLeft: '34px' }} />
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
                            required: true, message: 'Please input number of people!',
                          }],
                        initialValue: entity.count,

                      })(
                        <Input placeholder="请输入人数" style={{ width: 160, marginLeft: '34px' }} />
                      )}
                    </FormItem>
                  </Col>
                </Col>
                <Col className="gutter-row" span={6}>
                  <h3 style={{ color: 'grey', paddingTop: 12, float: 'right', marginRight: '20px' }}>{moment(new Date()).format("YYYY-MM-DD")}</h3>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={14} style={{ paddingTop: 8 }}>
                  <Col span={12} style={{ paddingTop: 8 }}>
                    <FormItem
                      {...formItemLayout}
                      label="客户需求名称"
                    >
                      {getFieldDecorator('requirementID', {
                        rules: [
                          // {
                          //   type: 'email', message: 'The input is not valid E-mail!',
                          // },
                          {
                            required: false, message: 'Please input your name!',
                          }],
                        initialValue: entity.requirement,
                      })(
                        <Input placeholder="请输入客户需求名称" style={{ width: '200px', marginLeft: '20px' }} />
                      )}

                    </FormItem>

                    <FormItem
                      label="销售负责人"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getFieldDecorator('saler', {
                        rules: [{ required: true, message: 'Please select one!' }],
                        initialValue: entity.saler,
                      })(
                        <Select
                          placeholder="Select a option"
                          onChange={this.handleSelectChange}
                          style={{ width: '200px', marginLeft: '20px' }}
                        >
                          {
                            this.getOptionsFromDics(101)
                          }
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
                        initialValue: entity.priority,
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
                        initialValue: entity.rqtype,
                      })(
                        <Select
                          placeholder="Select a option"
                          onChange={this.handleSelectChange}
                          style={{ width: '200px', marginLeft: '20px' }}
                        >
                          {
                            this.getOptionsFromDics(2)
                          }
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
                        initialValue: entity.client,
                      })(
                        <Input placeholder="请输入客户姓名" style={{ width: '200px', marginLeft: '20px' }} />
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
                        initialValue: entity.challengetarget,
                      })(
                        <Input placeholder="请输入挑战目标" style={{ width: '200px', marginLeft: '20px' }} />
                      )}

                    </FormItem>

                    <FormItem
                      label="客轮面试"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getFieldDecorator('turn', {
                        rules: [{ required: true, message: 'Please select one!' }],
                        initialValue: entity.turn,
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
                        initialValue: entity.candidate,
                      })(
                        <Input placeholder="请输入面试联系人" style={{ width: '200px', marginLeft: '20px' }} />
                      )}

                    </FormItem>
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
                        initialValue: entity.interviewaddr,
                      })(
                        <Input placeholder="请输入面试地址" style={{ width: 542, marginLeft: '20px' }} />
                      )}

                    </FormItem>
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
                        initialValue: entity.projectaddr,
                      })(
                        <Input placeholder="请输入项目地址" style={{ width: 542, marginLeft: '20px' }} />
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
                        initialValue: entity.department,
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
                        initialValue: entity.dm,
                      })(
                        <Select
                          placeholder="Select a option"
                          onChange={this.handleSelectChange}
                          style={{ width: '200px', marginLeft: '20px' }}
                        >
                          {
                            this.getOptionsFromDics(102)
                          }
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
                        initialValue: entity.english,
                      })(
                        <Select
                          placeholder="Select a option"
                          onChange={this.handleSelectChange}
                          style={{ width: '200px', marginLeft: '20px' }}
                        >
                          {
                            this.getOptionsFromDics(1)
                          }
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
                        initialValue: entity.rqstatus,
                      })(
                        <Select
                          placeholder="Select a option"
                          onChange={this.handleSelectChange}
                          style={{ width: '200px', marginLeft: '20px' }}
                        >
                          {
                            this.getOptionsFromDics(3)
                          }
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
                        initialValue: entity.salaryscope,
                      })(
                        <Input placeholder="请输入薪资范围" style={{ width: '200px', marginLeft: '20px' }} />
                      )}

                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      style={{ width: '100%' }}
                      label="周简历目标"
                    >
                      {getFieldDecorator('resumetarget', {
                        rules: [
                          {
                            required: true, message: 'Please input your name!',
                          }],
                        initialValue: entity.resumetarget,
                      })(
                        <Input placeholder="请输入目标" style={{ width: '200px', marginLeft: '20px' }} />
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
                        initialValue: entity.teamrange,
                      })(
                        <Input placeholder="请输入规模" style={{ width: '200px', marginLeft: '20px' }} />
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
                        initialValue: entity.contact,
                      })(
                        <Input placeholder="请输入联系人电话" style={{ width: '200px', marginLeft: '20px' }} />
                      )}

                    </FormItem>
                  </Col>
                </Col>

                <Col span={10} style={{ paddingTop: 8 }}>
                  <div style={{
                    borderRadius: 10,
                    border: '1px solid grey', paddingLeft: 15, paddingRight: 15, paddingBottom: 8, backgroundColor: 'white', width: '100%', minHeight: '618px', color: 'grey'
                  }}>
                    {
                      this.state.jdObject.map((element, index) => {
                        return (
                          <Row gutter={24} key={element.id} style={{ marginRight: 0, borderBottom: "solid 1px grey", paddingTop: 8, minHeight: 36 }}>
                            <Col span={12}>
                              {element.name}
                            </Col>
                            <Col span={12}>
                              <CheckboxGroup options={plainOptions} defaultValue={element.value} onChange={this.onChange.bind(this, index)} />
                            </Col>
                          </Row>
                        )
                      })
                    }
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal >
        </div>
      );
    }
  }
);

RequirementEditForm.propTypes = {
  requirement: PropTypes.object.isRequired
}

export default RequirementEditForm;
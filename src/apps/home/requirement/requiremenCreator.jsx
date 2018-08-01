import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col, Select, Cascader, InputNumber, Icon, notification } from 'antd';
import moment from 'moment';
import './../newform.css';
import { CreateRequirement } from './../../service/homeService'

const FormItem = Form.Item;
const Option = Select.Option;
const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};



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

    handleCancel = () => {
      this.setState({ visible: false });
    }

    handleSelectChange = (value) => {
      console.log('chooseValue', value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }
    state = {
      value: 1,
      value1: 1,
      value2: 1
    }

    jdObject = [
      { id: 1, value: 1, name: '1.英语读写熟练' },
      { id: 2, value: 1, name: '2.沟通能力强' },
      { id: 3, value: 1, name: '3.不焦虑' }
    ]

    handleOk = (e) => {
      this.setState({ loading: true });
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
        if (!err) {
          CreateRequirement(this.convertFromRq(values)).then(res => {
            this.setState({ loading: false, visible: false });
            openNotificationWithIcon('success', 'Notification', '创建成功')
            this.props.form.resetFields();
          }).catch(e => {
            this.setState({ loading: false, visible: false });
            openNotificationWithIcon('warning', 'Notification', '创建失败，请联系管理员');
            this.props.form.resetFields();
          })
          return;
        }
      });
    }

    convertFromRq = (formData) => {
      console.log('formData', formData)
      return {
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
        matrix: ['', '', '', '', '', '', '', ''],
        clientrequirment: "123",
        department: Number(formData.department)//所属部门
      }
    }

    onChange = (e) => {
      console.log('radio checked', e);
      // this.setState({
      //   value: e.target.value,
      // });
    }

    onChange1 = (e) => {
      this.setState({
        value1: e.target.value,
      });
    }
    onChange2 = (e) => {
      this.setState({
        value2: e.target.value,
      });
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
      return (
        <div>
          {/* <Button type="primary" shape="circle" icon="plus-circle-o" size={'small'} onClick={this.showModal} /> */}
          <Icon type="plus-circle-o" style={{ color: 'white', height: 10, width: 10 }} onClick={this.showModal} />
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
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="copy" icon="copy" onClick={this.handleCancel}>复制</Button>,
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="del" icon="delete" onClick={this.handleCancel}>删除</Button>,
              <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="trace" icon="rollback" onClick={this.handleCancel}>轨迹</Button>,
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

                      })(
                        <Input placeholder="请输入人数" style={{ width: 160, marginLeft: '34px' }} />
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
                        <Input placeholder="请输入客户需求ID" style={{ width: '200px', marginLeft: '20px' }} />
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
                      })(
                        <Input placeholder="请输入面试地址" style={{ width: 500, marginLeft: '20px' }} />
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
                      })(
                        <Input placeholder="请输入项目地址" style={{ width: 500, marginLeft: '20px' }} />
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
                      })(
                        <Input placeholder="请输入联系人电话" style={{ width: '200px', marginLeft: '20px' }} />
                      )}

                    </FormItem>
                  </Col>
                </Col>

                <Col span={10} style={{ paddingTop: 8 }}>
                  {/* <p style={{ float: 'left' }}>
                    JD
                 </p> */}
                  <div style={{ borderStyle: 'solid solid solid solid', borderColor: 'grey grey grey grey', float: 'left', marginLeft: 10, paddingTop: 15, paddingLeft: 5, paddingRight: 5, paddingBottom: 8, backgroundColor: 'white', width: '90%', minHeight: '618px', color: 'black' }}>

                    {
                      this.jdObject.map((element, index) => {
                        return (
                          <Row gutter={24} key={element.id} style={{ borderBottom: "solid 1px grey", marginBottom: '1px', minHeight: 30 }}>
                            <Col span={12}>
                              {element.name}
                            </Col>
                            <Col span={12}>
                              <RadioGroup onChange={this.onChange} value={element.value}>
                                <Radio value={1}>硬性指标</Radio>
                                <Radio value={2}>岗位优势</Radio>
                              </RadioGroup>
                            </Col>
                          </Row>
                        )
                      })
                    }
                    {/* <Row gutter={24} style={{ paddingTop: 10, borderBottom: "solid 1px grey", marginBottom: '1px' }}>
                      <Col span={12}>
                        {'2.会吹牛逼'}
                      </Col>
                      <Col span={12}>
                        <RadioGroup onChange={this.onChange1} value={this.state.value1}>
                          <Radio value={1}>硬性指标</Radio>
                          <Radio value={2}>岗位优势</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>

                    <Row gutter={24} style={{ paddingTop: 10, borderBottom: "solid 1px grey", marginBottom: '1px' }}>
                      <Col span={12}>
                        {'3.不焦虑'}
                      </Col>
                      <Col span={12}>
                        <RadioGroup onChange={this.onChange2} value={this.state.value2}>
                          <Radio value={1}>硬性指标</Radio>
                          <Radio value={2}>岗位优势</Radio>
                        </RadioGroup>
                      </Col>
                    </Row> */}
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
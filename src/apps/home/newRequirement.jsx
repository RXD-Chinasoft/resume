import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col } from 'antd';
import DropDownButton from './dropdown'
const FormItem = Form.Item;

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
          width
        >
          <div style={{ background: 'blue' }}>
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
                      <Col className="gutter-row" span={6}><label className="content" style={{ color: 'white' , marginTop: 10}}>客户需求ID</label></Col>
                      <Col className="gutter-row" span={6}><Input placeholder="请输入职位名称" style={{ width: 200 }} /></Col>
                    </Row>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <Row>
                      <Col className="gutter-row" span={6}><label style={{ color: 'white' , marginTop: 10 }}>所属部门</label></Col>
                      <Col className="gutter-row" span={6}><DropDownButton>
                      </DropDownButton></Col>
                    </Row>
                  </Col>
                </Col>
                <Col className="gutter-row" span={10}>

                </Col>
              </Row>

            </div>
          </div>

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
        </Modal>
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
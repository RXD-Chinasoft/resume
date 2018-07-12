import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Row, Col } from 'antd';
import DropDownButton from './dropdown'
const FormItem = Form.Item;

const CandidateCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          width={"90%"}
        >

        </Modal>
      );
    }
  }
);

export default CandidateCreateForm;

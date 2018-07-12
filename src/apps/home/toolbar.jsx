import React, { Component } from 'react';
import CandidateCreateForm from './newCandidate'
import RequirementCreateForm from './newRequirement'
import { Button } from 'antd';

class ToolBar extends Component {

    state = {
        rqVisible: false,
        cdVisible: false,
    };

    showRqModal = () => {
        this.setState({ rqVisible: true });
    }

    handleRqCancel = () => {
        this.setState({ rqVisible: false });
    }

    handleRqCreate = () => {
        const form = this.rqFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ rqVisible: false });
        });
    }

    saveRqFormRef = (formRef) => {
        this.rqFormRef = formRef;
    }


    showCdModal = () => [
        this.setState({ cdVisible: true })
    ]
    handleCdCancel = () => {
        this.setState({ cdVisible: false });
    }

    handleCdCreate = () => {
        const form = this.cdFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ cdVisible: false });
        });
    }

    saveCdFormRef = (formRef) => {
        this.cdFormRef = formRef;
    }

    render() {
        return (
            <div style={{ padding: '10px' }}>
                <Button type="primary" onClick={this.showRqModal}>创建职位</Button>
                <Button style={{ marginLeft: '10px' }} type="primary" onClick={this.showCdModal}>创建候选人</Button>
                <RequirementCreateForm
                    wrappedComponentRef={this.saveRqFormRef}
                    visible={this.state.rqVisible}
                    onCancel={this.handleRqCancel}
                    onCreate={this.handleRqCreate}
                />
                <CandidateCreateForm
                    wrappedComponentRef={this.saveCdFormRef}
                    visible={this.state.cdVisible}
                    onCancel={this.handleCdCancel}
                    onCreate={this.handleCdCreate}
                />
            </div>
        )
    }
}

export default ToolBar
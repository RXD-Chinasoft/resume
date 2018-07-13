import React, { Component } from 'react';
import CandidateCreateForm from './newCandidate'
import RequirementCreateForm from './newRequirement'
import { Button } from 'antd';
import { CreateCandidate } from './../service/homeService'

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

    handleRqCreate = (e) => {
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

    handleCdCreate = (e) => {
        e.preventDefault();
        const form = this.cdFormRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ cdVisible: false });
            CreateCandidate(this.convertFromCd(values))
        });
    }

    convertFromCd = (formData) => {
        const { name, size, type, thumbUrl } = formData.upload[0]
        console.log(name, size, type, thumbUrl)
        return {
            requirement: 1,
            candidate: formData.name,
            hiringmanager: Number(formData.zhaopin),
            saler: Number(formData.xiaoshou),
            dm: Number(formData.jiaofu),
            status: Number(formData.status),
            risk: Number(formData.risk),
            descrpition: formData.describe,
            file: thumbUrl,
            filename: name,
            filesize: size,
            filetype: type,
            createtime: "20180608",
            message: formData.msg,
        };
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
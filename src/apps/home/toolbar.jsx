import React, { Component } from 'react';
import CandidateCreateForm from './newCandidate'
import RequirementCreateForm from './newRequirement'
import { Button } from 'antd';
import { CreateCandidate } from './../service/homeService'
import { CreateRequirement } from './../service/homeService'

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
        e.preventDefault();

        const form = this.rqFormRef.props.form;
        console.log('handleRqCreate', e, form)
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ cdVisible: false });
            CreateRequirement(this.convertFromRq(values))
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
        console.log('handleCdCreate', e)
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
        const { name, size, type, thumbUrl } = formData.upload.length > 0 ? formData.upload[0] : { name: '', size: '', type: '', thumbUrl: '' }
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
            file: thumbUrl.length > 0 ? thumbUrl.substring(thumbUrl.indexOf('base64,') + 7) : thumbUrl,
            filename: name,
            filesize: size,
            filetype: type,
            createtime: "20180608",
            message: formData.msg,
        };
    }
    convertFromRq = (formData) => {
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
            createtime: "20180713",
            descrpition: []
        }
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
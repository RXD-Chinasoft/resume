import React, { Component } from 'react';
import CandidateCreateForm from './newCandidate'
import RequirementCreateForm from './newRequirement'
import { Button, Row, Col } from 'antd';
import { CreateCandidate } from './../service/homeService'
import { CreateRequirement } from './../service/homeService'
import { Carousel, Badge } from 'antd';

class ToolBar extends Component {

    state = {
        rqVisible: false,
        cdVisible: false,
        loading: false
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
            this.setState({ rqVisible: false });
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
        const { name, size, type, thumbUrl } = formData.upload ? formData.upload[0] : { name: '', size: 0, type: '', thumbUrl: '' }
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
            descrpition: [],
            matrix: ['', '', '', '', '', '', '', ''],
            clientrequirment: "123",
            department: Number(formData.department)//所属部门
        }
    }

    saveCdFormRef = (formRef) => {
        this.cdFormRef = formRef;
    }

    //
    handleOk = () => {
        console.log("ok")
    }

    render() {
        const { loading } = this.state;
        return (
            <Row type={'flex'} align={'middle'}>
                {/* <Col span={1}><Badge status="error" /></Col> */}
                <Col span={10}>
                    <span className="flex-center">
                        <Badge status="default" />
                        <Carousel autoplay vertical dots={false}>
                            <div><h3>牛逼</h3></div>
                            <div><h3>非常牛</h3></div>
                            <div><h3>血牛逼</h3></div>
                            <div><h3>兽啊</h3></div>
                        </Carousel>
                    </span>

                </Col>
                <Col span={5} offset={9} push={3}>
                    <Button style={{ backgroundColor: '#d69250', color: 'white' }} key="saverequires" icon="save" loading={loading} onClick={this.handleOk}>
                        保存
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default ToolBar
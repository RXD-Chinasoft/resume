import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Badge, Icon } from 'antd';
import ToolBar from './toolbar'
import { Row, Col } from 'antd';
import { GetRequirements, NotifyMatrixChanged, GetDictionaries } from './../service/homeService';
import './home.css';
import CandidateCreateForm from './candidate/candidateCreator';
import CandidateEditForm from './candidate/candidateEditor';
import RequirementCreateForm from './requirement/requiremenCreator';
import RequirementEditForm from './requirement/requiremenEditor';
import { OpenNotificationWithIcon } from './../service/utils';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    height: 115,

    // styles we need to apply on draggables
    ...draggableStyle
});

const getCandidateStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // width: 110,
    height: 100,
    marginBottom: 10,
    color: 'white',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#93dbe6' : 'white',
    padding: 3,
    width: '100%',
    minHeight: 110,
    paddingTop: 0,
});


const DROPPABLE_KEY = "droppable";
const DROPPABLE_SEPERATOR = "+";

const columns = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 5', dataIndex: 'address', key: '5' },
    { title: 'Column 6', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="javascript:;">action</a>,
    },
];
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
}];
class HomeTable extends Component {
    state = {
        requirements: [],
        candidate: [],
    };

    constructor(props) {
        super(props)
        this.candidateComponents = {}
        this.requirementComponents = {}
    }

    handleSave = (doneCall) => {
        console.log("ok", this.state.candidate)
        let requirements = {}
        for (const rqmId in this.state.candidate) {
            requirements[rqmId] = []
            if (this.state.candidate.hasOwnProperty(rqmId)) {
                const candidateColums = this.state.candidate[rqmId];
                for (const candidates of candidateColums) {
                    let matrix = []
                    if (candidates.length > 0) {
                        matrix = candidates.map((candidate, index) => {
                            return candidate.id
                        })
                    }
                    requirements[rqmId].push(matrix.join(','))
                }
            }
        }
        NotifyMatrixChanged(requirements).then(response => {
            console.log('response ===>', response)
            OpenNotificationWithIcon('success', 'Notification', '保存成功')
            this.getRqs()
            doneCall()
            // this.refs.toolbar.done()
        }).catch(e => {
            OpenNotificationWithIcon('warning', 'Notification', '保存失败')
            doneCall()
            // this.refs.toolbar.done()
        })
    }

    getCandidates = (requirement, coloum) => {
        console.log(requirement, coloum, this.state.candidate)
        return this.state.candidate[requirement.id][coloum]
    }

    onDragEnd1 = (requirement, result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const srcbases = source.droppableId.substring(DROPPABLE_KEY.length)
            const srcParams = srcbases.split(DROPPABLE_SEPERATOR)
            console.log('gggggggggg', source.index, destination.index, srcParams[1])
            const items = reorder(
                this.getCandidates(requirement, Number(srcParams[1])),
                source.index,
                destination.index
            );

            let { candidate } = this.state;
            console.log('gggggggggg', items, candidate)
            // state = 
            candidate[requirement.id][Number(srcParams[1])] = items

            this.setState({ candidate });
        }
        else {
            console.log('hhhh', source.index, destination.index)

            const srcbases = source.droppableId.substring(DROPPABLE_KEY.length)
            const srcParams = srcbases.split(DROPPABLE_SEPERATOR)
            const dstbases = destination.droppableId.substring(DROPPABLE_KEY.length)
            const dstParams = dstbases.split(DROPPABLE_SEPERATOR)
            console.log('hhhh', source.index, destination.index, srcParams, dstParams)
            const result = move(
                this.getCandidates(requirement, Number(srcParams[1])),
                this.getCandidates(requirement, Number(dstParams[1])),
                source,
                destination
            );

            let { candidate } = this.state;
            console.log('hhhhsssssssaaaaaaaaaaa', result, candidate)
            candidate[requirement.id][Number(srcParams[1])] = result[source.droppableId]
            candidate[requirement.id][Number(dstParams[1])] = result[destination.droppableId]
            this.setState({ candidate });
        }
    };

    getRqs = () => {
        GetRequirements().then(response => {
            console.log('response ===>', response)
            this.setState({
                requirements: [].concat(response.data.requirements),
                candidate: response.data.relateCandidates,
            })
        })
    }

    onCandidateClick = (candidate) => {
        console.log(candidate, this.candidateComponents[candidate.id])
        this.candidateComponents[candidate.id].showModal()
    }

    onRequirementClick = (requirement) => {
        console.log(requirement, this.requirementComponents[requirement.id])
        this.requirementComponents[requirement.id].showModal()
    }

    onEditDone = (requirement, coloum, index, obj) => {
        const { candidate } = this.state;
        candidate[requirement][coloum][index] = obj
        this.setState({ candidate: candidate })
    }
    onRQEditDone = (index, obj) => {
        const { requirements } = this.state;
        requirements[index] = obj
        this.setState({ requirements: requirements })
    }

    componentDidMount() {
        this.getRqs()
        GetDictionaries().then(response => {
            console.log('Dictionaries response ===>', response)
            try {
                localStorage.setItem('dictionaries', JSON.stringify(response.data))
            } catch (error) {
                localStorage.setItem('dictionaries', JSON.stringify([]))
            }

            // this.setState({
            //     dictionaries: [].concat(response.data)
            // })
        })
    }

    showDetail() {
        console.log('show detail ....')
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const columes = [0, 0, 0, 0, 0, 0, 0, 0]
        for (const key in this.state.candidate) {
            this.state.candidate[key].forEach((element, index) => {
                columes[index] = columes[index] + element.length
            });
        }
        console.log("total ", columes)
        return (
            <div>
                <ToolBar onSave={this.handleSave} ref="toolbar" />
                {/* style={{ display: 'flex' }} */}
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
                {/* <div className="panel border-tbl-radius border-tbr-radius" style={{ minHeight: this.state.requirements && this.state.requirements.length > 0 ? 0 : 500 }}>
                    <Row gutter={16} style={{ width: '100%', textAlign: 'center', }}>
                        <Col className="gutter-row gutter-row-padding-none" span={3}>
                            <div className="gutter-box border-tl-radius main-title">职位需求({this.state.requirements.length})
                                <span style={{ float: 'right', marginRight: 10 }}>
                                    <RequirementCreateForm
                                        // requirement={element.id}
                                        onSaveRqDone={() => {
                                            this.getRqs()
                                        }}
                                    />
                                </span>
                            </div>
                        </Col>
                        <Col className="gutter-row gutter-row-padding-none" span={19}>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">简历筛选({columes[0]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">内部面试({columes[1]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">内部通过({columes[2]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">推荐客户({columes[3]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">安排客户({columes[4]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">客户面试({columes[5]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">客户通过({columes[6]})</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">Offer({columes[7]})</div>
                            </Col>
                        </Col>
                        <Col className="gutter-row gutter-row-padding-none" span={2}>
                            <div className="gutter-box done-gradient border-tr-radius">入职(7)</div>
                        </Col>
                    </Row>
                    {

                        this.state.requirements.map((element, index) => {
                            console.log('element', this.state.requirements)
                            console.log('candidate', this.state.candidate)
                            console.log('elementid', element.id)

                            return (
                                <Row key={element.id} gutter={16} style={{ width: '100%', display: 'flex' }}>

                                    <Col span={3} className="backgroundColor first-colum border-tbl-radius">
                                        <div className="requirementBox">
                                            <Row>
                                                <div style={{ float: 'right', marginRight: -5, height: 9 }}>
                                                    <Badge status="error" />
                                                </div>
                                            </Row>
                                            <Row>
                                                <div>
                                                    <Icon type="environment" style={{ color: '#347cb7' }} />
                                                    <label style={{ textAlign: 'center' }}> {element.area}</label>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div>
                                                    <Icon type="user" style={{ color: '#347cb7' }} />
                                                    <label style={{ textAlign: 'center' }}> {element.client}</label>
                                                    <label style={{ float: 'right', color: 'red', fontSize: '1rem' }}> {element.count}</label>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div>
                                                    <Icon type="calendar" style={{ color: '#347cb7' }} />
                                                    <label style={{ textAlign: 'center' }}> {element.createtime}</label>
                                                </div>
                                            </Row>
                                            <Row>

                                                <div>
                                                    <span style={{ float: 'right' }}>
                                                        <CandidateCreateForm
                                                            requirement={element.id}
                                                            onSaveDone={() => {
                                                                this.getRqs()
                                                            }}
                                                        />
                                                    </span>
                                                    <span style={{ float: 'right', marginRight: 10 }}>
                                                        <RequirementEditForm
                                                            requirement={element}
                                                            wrappedComponentRef={(reference) => {
                                                                this.requirementComponents[element.id] = reference
                                                            }}
                                                            onRQUpdateDone={this.onRQEditDone.bind(this, index)}
                                                        />
                                                    </span>

                                                </div>
                                            </Row>
                                        </div>
                                    </Col>
                                    <DragDropContext onDragEnd={this.onDragEnd1.bind(this, element)}>
                                        <Col className="gutter-row" span={19} style={{ display: 'flex', borderBottom: "solid 1px #e6e5e5" }}>
                                            {
                                                this.state.candidate[element.id] ?
                                                    this.state.candidate[element.id].map((cand, i) => {
                                                        return (
                                                            <Col key={i} className="gutter-row" span={3} style={{ borderRight: "solid 1px #e6e5e5", paddingTop: 10 }}>

                                                                {this.state.candidate[element.id] ?
                                                                    <Droppable droppableId={DROPPABLE_KEY + element.id + DROPPABLE_SEPERATOR + i}>
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                                                {this.state.candidate[element.id][i].map((item, j) => (
                                                                                    <Draggable
                                                                                        key={item.id}
                                                                                        draggableId={item.id}
                                                                                        index={j}>
                                                                                        {(provided, snapshot) => (
                                                                                            <div ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                style={getCandidateStyle(
                                                                                                    snapshot.isDragging,
                                                                                                    provided.draggableProps.style
                                                                                                )}
                                                                                                className="candidateBox"
                                                                                            >
                                                                                                <CandidateEditForm
                                                                                                    candidate={item}
                                                                                                    wrappedComponentRef={(reference) => {
                                                                                                        this.candidateComponents[item.id] = reference
                                                                                                    }}
                                                                                                    onUpdateDone={this.onEditDone.bind(this, element.id, i, j)}
                                                                                                />
                                                                                                <div className="left-middle-right" style={{ borderBottom: '1px solid white', paddingBottom: 3 }}>
                                                                                                    <Badge style={{ height: 20, flexGrow: 1 }} status="success" />
                                                                                                    <label style={{ fontSize: 12, flexGrow: 5, paddingTop: 1, width: 60 }} className="single-line-doc">{item.candidate}</label>
                                                                                                    <label style={{ color: 'white', fontSize: 12, flexGrow: 1, paddingTop: 1 }}> 6/2</label>
                                                                                                </div>
                                                                                                <div className="left-middle-right" style={{ paddingBottom: 3, marginTop: 3 }}>
                                                                                                    <Icon type="search" style={{ color: 'white', flexGrow: 1, paddingTop: 3 }} />
                                                                                                    <label style={{ fontSize: 12, flexGrow: 5, paddingTop: 1, width: 60, paddingLeft: 3 }} className="single-line-doc">{item.gp}</label>
                                                                                                    <label style={{ color: 'white', fontSize: 12, flexGrow: 1, paddingTop: 1 }}> 6/2</label>
                                                                                                </div>
                                                                                                <div className="left-middle-right" style={{ paddingBottom: 3, marginTop: 3 }}>
                                                                                                    <Icon type="man" style={{ color: 'white', flexGrow: 1, paddingTop: 3 }} />
                                                                                                    <label style={{ fontSize: 12, flexGrow: 5, paddingTop: 1, width: 60 }} className="single-line-doc">{item.price}</label>
                                                                                                </div>
                                                                                                <Row>
                                                                                                    <div>
                                                                                                        <span style={{ float: 'right' }}>
                                                                                                            <Icon type="form" style={{ color: 'white' }} onClick={this.onCandidateClick.bind(this, item)} />
                                                                                                        </span>

                                                                                                    </div>
                                                                                                </Row>
                                                                                            </div>
                                                                                        )}
                                                                                    </Draggable>
                                                                                ))}
                                                                                {provided.placeholder}
                                                                            </div>
                                                                        )}
                                                                    </Droppable> : (
                                                                        <div>

                                                                        </div>
                                                                    )}
                                                            </Col>
                                                        )
                                                    })
                                                    : (<div></div>)
                                            }
                                        </Col>
                                    </DragDropContext>
                                    <Col className="gutter-row done-gradient border-tbr-radius" style={{ minHeight: this.state.requirements && this.state.requirements.length > 0 ? 0 : 500 }} span={2}>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div> */}
            </div >
        );
    }
}

export default HomeTable

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Badge, Icon } from 'antd';
import ToolBar from './toolbar'
import { Row, Col } from 'antd';
import { GetRequirements } from './../service/homeService';
import './home.css';
import CandidateCreateForm from './newCandidate';
import RequirementCreateForm from './newRequirement';

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
class Home extends Component {
    state = {
        requirements: [],
        candidate: [],
    };

    handleSave = () => {
        console.log("ok", this.state.candidate)
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

    componentDidMount() {
        GetRequirements().then(response => {
            console.log('response ===>', response)
            this.setState({
                requirements: [].concat(response.data.requirements),
                candidate: response.data.relateCandidates,
            })
        })
    }
    componentWillMount() {
        console.log('will Mount')
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <div>
                <ToolBar onSave={this.handleSave} />
                {/* style={{ display: 'flex' }} */}
                <div className="panel border-tbl-radius border-tbr-radius">
                    <Row gutter={16} style={{ width: '100%', textAlign: 'center', }}>
                        <Col className="gutter-row gutter-row-padding-none" span={3}>
                            <div className="gutter-box border-tl-radius main-title">职位需求(7)
                            <span style={{ float: 'right', marginRight: 10 }}>
                                    <RequirementCreateForm
                                    />
                                </span>
                            </div>
                        </Col>
                        <Col className="gutter-row gutter-row-padding-none" span={19}>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">简历筛选(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">内部面试(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">内部通过(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">推荐客户(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">安排客户(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">客户面试(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">客户通过(7)</div>
                            </Col>
                            <Col className="gutter-row gutter-row-padding-none" span={3}>
                                <div className="gutter-box flow-title">Offer(7)</div>
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
                                                        />
                                                    </span>
                                                    <span style={{ float: 'right', marginRight: 10 }}>
                                                        <Icon type="form" style={{ color: '#347cb7' }} onClick={this.showDetail} />
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
                                                                                            // <div
                                                                                            //     ref={provided.innerRef}
                                                                                            //     {...provided.draggableProps}
                                                                                            //     {...provided.dragHandleProps}
                                                                                            //     style={getItemStyle(
                                                                                            //         snapshot.isDragging,
                                                                                            //         provided.draggableProps.style
                                                                                            //     )}>
                                                                                            //     {item.candidate}
                                                                                            // </div>
                                                                                            <div ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                style={getCandidateStyle(
                                                                                                    snapshot.isDragging,
                                                                                                    provided.draggableProps.style
                                                                                                )}
                                                                                                className="candidateBox">
                                                                                                <Row style={{ borderBottom: '1px solid white', paddingBottom: 3 }}>
                                                                                                    <div>
                                                                                                        <Badge status="success" />
                                                                                                        <label style={{ textAlign: 'center', fontSize: 12 }}>候选人A</label>
                                                                                                        <label style={{ float: 'right', color: 'white', fontSize: 12, marginTop:2 }}> 6/2</label>
                                                                                                    </div>
                                                                                                </Row>
                                                                                                <Row style={{ marginTop: 3 }}>
                                                                                                    <div>
                                                                                                        <Icon type="search" style={{ color: 'white' }} />
                                                                                                        <label style={{ textAlign: 'center', fontSize: 12, paddingLeft: 5 }}>陈某</label>
                                                                                                        <label style={{ float: 'right', color: 'white', fontSize: 12, marginTop:2 }}> 6/2</label>
                                                                                                    </div>
                                                                                                </Row>
                                                                                                <Row>
                                                                                                    <div>
                                                                                                        <Icon type="man" style={{ color: 'white' }} />
                                                                                                        <label style={{ textAlign: 'center', fontSize: 12, paddingLeft: 5 }}>李某</label>
                                                                                                    </div>
                                                                                                </Row>
                                                                                                <Row>
                                                                                                    <div>
                                                                                                        <span style={{ float: 'right' }}>
                                                                                                            <Icon type="down" style={{ color: 'white' }} onClick={this.showDetail} />
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
                                    <Col className="gutter-row done-gradient border-tbr-radius" span={2}>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div>
            </div >
        );
    }
}

export default Home

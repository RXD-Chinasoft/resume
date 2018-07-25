import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from 'antd';
import ToolBar from './toolbar'
import { Row, Col } from 'antd';
import { GetRequirements } from './../service/homeService';
import './home.css'

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        candidate: `候选人 ${k + offset}`
    }));

const getBlanks1 = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `blanks1-${k + offset}`,
        candidate: `item - ${k + offset}`
    }));
const getBlanks2 = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `blanks2-${k + offset}`,
        candidate: `世界杯 ${k + offset}`
    }));


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

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 110,
    height: 80,
});



class Home extends Component {
    state = {
        items: getItems(10),
        selected: [],
        blanks: [],
        blanks3: [],
        requirements: [],
        cadidate: [],
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected',
        droppable3: 'blanks',

    };

    getList = id => this.state[this.id2List[id]];

    getCandidates = (requirement, coloum) => {
        console.log(requirement, coloum, this.state.candidate)
        return this.state.candidate[requirement.id][coloum]
    }

    onDragEnd = result => {
        const { source, destination } = result;
        console.log('ffff', source, destination, result)
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            console.log('gggggggggg',source.index,destination.index)
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }
            if (source.droppableId === 'droppable3') {
                state = { blanks: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            console.log(result)

            this.setState({
                items: result.droppable || this.state.items,
                selected: result.droppable2 || this.state.selected,
                blanks: result.droppable3 || this.state.blanks,
            });
        }
    };

    onDragEnd1 = (requirement, coloum, result) => {
        const { source, destination } = result;
        console.log('ffff', source, destination, result, requirement, coloum)
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            console.log('gggggggggg',source.index,destination.index)
            const items = reorder(
                this.getCandidates(requirement, coloum),
                source.index,
                destination.index
            );

            let {candidate} = this.state;
            console.log('gggggggggg',items,candidate)
            // state = 
            candidate[requirement.id][coloum] = items

            this.setState({candidate});
        } 
        // else {
        //     const result = move(
        //         this.getList(source.droppableId),
        //         this.getList(destination.droppableId),
        //         source,
        //         destination
        //     );
        //     console.log(result)

        //     this.setState({
        //         items: result.droppable || this.state.items,
        //         selected: result.droppable2 || this.state.selected,
        //         blanks: result.droppable3 || this.state.blanks,
        //     });
        // }
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
                <ToolBar />
                {/* style={{ display: 'flex' }} */}
                <div>
                    <Row gutter={16} style={{ marginTop: '10px', width: '100%', textAlign: 'center', }}>
                        <Col className="gutter-row gutter-row-padding-none" span={3}>
                            <div className="gutter-box border-tl-radius">职位需求(7)</div>
                        </Col>
                        <Col className="gutter-row gutter-row-padding-none" span={18}>
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
                        <Col className="gutter-row gutter-row-padding-none" span={3}>
                            <div className="gutter-box done-gradient border-tr-radius">入职(7)</div>
                        </Col>
                    </Row>
                    {
                        this.state.requirements.map((element, index) => {
                            console.log('element', this.state.requirements)
                            console.log('candidate', this.state.candidate)
                            console.log('elementid', element.id)
                            return (
                                <Row key={element.id} gutter={16} style={{ width: '100%', borderBottom: "solid 1px grey" }}>
                                    <Col span={3} className="backgroundColor">
                                        <div className="itemBox">
                                            <p style={{ color: 'black' }}>
                                                {element.area}
                                            </p>
                                        </div>
                                    </Col>
                                    <DragDropContext onDragEnd={this.onDragEnd1.bind(this, element, 0)}>
                                        <Col className="gutter-row" span={18} style={{ marginTop: '10px' }}>
                                            <Col className="gutter-row" span={3} style={{ borderRight: "solid 1px grey", marginBottom: '1px' }}>
                                                {/* {

                                                    this.state.candidate[element.id] ? this.state.candidate[element.id][0].map((candiate, index) => {
                                                        console.log('this.state.candidate', this.state.candidate)
                                                        console.log('candiate', candiate)
                                                        return (
                                                            <div key={candiate.id} className="candidateBox">
                                                                <p>
                                                                    {candiate.candidate}
                                                                    --
                                                                    {candiate.createtime}
                                                                </p>
                                                            </div>
                                                        )
                                                    }) : (
                                                            <div>

                                                            </div>
                                                        )
                                                } */}

                                                {this.state.candidate[element.id] ?
                                                    <Droppable droppableId={"droppable" + element.id}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                                {this.state.candidate[element.id][0].map((item, index) => (
                                                                    <Draggable
                                                                        key={item.id}
                                                                        draggableId={item.id}
                                                                        index={index}>
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={getItemStyle(
                                                                                    snapshot.isDragging,
                                                                                    provided.draggableProps.style
                                                                                )}>
                                                                                {item.candidate}
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
                                            <Col className="gutter-row" span={3} style={{ borderRight: "solid 1px grey" }}>
                                                {/* <Droppable droppableId="droppable">
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.state.items.map((item, index) => (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                snapshot.isDragging,
                                                                                provided.draggableProps.style
                                                                            )}>
                                                                            {item.candidate}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable> */}
                                            </Col>
                                            <Col className="gutter-row" span={3} style={{ borderRight: "solid 1px grey" }}>
                                                {/* <Droppable droppableId="droppable2">
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.state.selected.map((item, index) => (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                snapshot.isDragging,
                                                                                provided.draggableProps.style
                                                                            )}>
                                                                            {item.candidate}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable> */}
                                            </Col>
                                            <Col className="gutter-row" span={3}>
                                                {/* <Droppable droppableId="droppable3">
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}>
                                                            {this.state.blanks.map((item, index) => (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                snapshot.isDragging,
                                                                                provided.draggableProps.style
                                                                            )}>
                                                                            {item.candidate}
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable> */}
                                            </Col>
                                            <Col className="gutter-row" span={3}>

                                            </Col>
                                            <Col className="gutter-row" span={3}>

                                            </Col>
                                            <Col className="gutter-row" span={3}>

                                            </Col>
                                            <Col className="gutter-row" span={3}>

                                            </Col>
                                        </Col>
                                    </DragDropContext>
                                    <Col className="gutter-row" span={3}>
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

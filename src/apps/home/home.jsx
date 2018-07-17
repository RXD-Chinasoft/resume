import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from 'antd';
import ToolBar from './toolbar'
import { Row, Col } from 'antd';
import { GetRequirements } from './../service/homeService';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `候选人 ${k + offset}`
    }));

const getBlanks1 = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `blanks1-${k + offset}`,
        content: `item - ${k + offset}`
    }));
const getBlanks2 = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `blanks2-${k + offset}`,
        content: `世界杯 ${k + offset}`
    }));
const getBlanks3 = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `blanks3-${k + offset}`,
        content: `世界杯 ${k + offset}`
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
});



class Home extends Component {
    state = {
        items: getItems(10),
        selected: getBlanks1(0),
        blanks: getBlanks2(0),
        blanks3: getBlanks3(0),
        requirements: []
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
        droppable4: 'blanks3',

    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        console.log('ffff', source, destination, result)
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
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
            if (source.droppableId === 'droppable4') {
                state = { blanks3: items };
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
                blanks3: result.droppable4 || this.state.blanks3
            });
        }
    };

    componentDidMount() {
        GetRequirements().then(response => {
            console.log('response ===>', response)
            this.setState({ requirements: [].concat(response.data) })
            console.log('requirements', response.data)
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
                        <Col className="gutter-row" span={3}>
                            <div className="gutter-box">职位需求(7)</div>
                        </Col>
                        <Col className="gutter-row" span={18}>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">简历筛选(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">内部面试(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">内部通过(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">推荐客户(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">安排客户(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">客户面试(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">客户通过(7)</div>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">Offer(7)</div>
                            </Col>
                        </Col>
                        <Col className="gutter-row" span={3}>
                            <div className="gutter-box">入职(7)</div>
                        </Col>
                    </Row>
                    {
                        this.state.requirements.map((element, index) => {

                            return
                            <Row gutter={16} style={{ marginTop: '10px', width: '100%', textAlign: 'center' }}>
                                <Col className="gutter-row" span={3}>
                                    <div style={{ width: 200, height: 100, textAlign: 'center', backgroundColor: 'grey' }}>
                                        <p>{element.area}</p>
                                    </div>
                                </Col>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Col className="gutter-row" span={18}>
                                        <Col className="gutter-row" span={3}>
                                        </Col>
                                        <Col className="gutter-row" span={3}>
                                        </Col>
                                        <Col className="gutter-row" span={3}>
                                        </Col>
                                        <Col className="gutter-row" span={3}>
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
                            console.log('element', element)
                        })
                    }

                    {/* <Row gutter={16} style={{ marginTop: '10px', width: '100%', textAlign: 'center', }}>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">职位需求(7)</div>
                            </Col>
                            <Col className="gutter-row" span={18}>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">简历筛选(7)</div>
                                    <div style={{ display: 'flex', marginLeft: '5px' }}>
                                        <Droppable droppableId="droppable">
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
                                                                    {item.content}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">内部面试(7)</div>
                                    <Droppable droppableId="droppable2">
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
                                                                {item.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">内部通过(7)</div>
                                    <Droppable droppableId="droppable3">
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
                                                                {item.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">推荐客户(7)</div>
                                    <Droppable droppableId="droppable4">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.blanks3.map((item, index) => (
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
                                                                {item.content}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">安排客户(7)</div>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">客户面试(7)</div>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">客户通过(7)</div>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <div className="gutter-box">Offer(7)</div>
                                </Col>
                            </Col>
                            <Col className="gutter-row" span={3}>
                                <div className="gutter-box">入职(7)</div>
                            </Col>
                        </DragDropContext>
                    </Row> */}
                </div>
            </div >
        );
    }
}

export default Home

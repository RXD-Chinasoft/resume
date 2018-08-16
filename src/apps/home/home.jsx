import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Badge, Icon } from 'antd';
import ToolBar from './toolbar'
import { Row, Col } from 'antd';
import { GetRequirements, NotifyMatrixChanged, GetDictionaries, CreateCandidate } from './../service/homeService';
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
const mapping = [
    [{ id: 10, name: "未筛选" }, { id: 11, name: "内筛通过" }, { id: 12, name: "内筛失败" }],
    [{ id: 20, name: "未安排内面" }, { id: 21, name: "已安排内面" }, { id: 22, name: "已内面" }, { id: 23, name: "内面通过" }, { id: 24, name: "内面失败" }],
    [{ id: 30, name: "未筛选" }, { id: 31, name: "内筛通过" }, { id: 32, name: "内筛失败" }],
    [{ id: 40, name: "未推荐" }, { id: 41, name: "已推荐" }, { id: 42, name: "推荐通过" }, { id: 42, name: "推荐失败" }],
    [{ id: 50, name: "未筛选" }, { id: 51, name: "内筛通过" }, { id: 52, name: "内筛失败" }],
    [{ id: 60, name: "未安排面试" }, { id: 61, name: "已安排面试" }, { id: 62, name: "已客面" }, { id: 63, name: "客面通过" }, { id: 64, name: "客面失败" }],
    [{ id: 70, name: "未筛选" }, { id: 71, name: "内筛通过" }, { id: 72, name: "内筛失败" }],
    [{ id: 80, name: "未安排面试" }, { id: 81, name: "已安排面试" }, { id: 82, name: "已客面" }, { id: 83, name: "客面通过" }, { id: 84, name: "客面失败" }],
    [{ id: 90, name: "等待入职" }, { id: 91, name: "二次审批" }, { id: 92, name: "正常入职" }, { id: 92, name: "入职失败" }]
]

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

const getCandidateStyle = (isDragging, draggableStyle, index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    width: 108,
    height: 100,
    marginBottom: 10,
    color: 'white',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 5,
    // marginLeft: 3,
    // marginRight: 3,

    // styles we need to apply on draggables
    ...draggableStyle,
    zIndex: 999
});

const getListStyle = (isDraggingOver, index) => ({
    background: isDraggingOver ? '#93dbe6' : index == 8 ? 'transparent' : 'white',
    // padding: 3,
    width: '100%',
    minHeight: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 5,
});


const DROPPABLE_KEY = "droppable";
const DROPPABLE_SEPERATOR = "+";

class Home extends Component {
    state = {
        requirements: [],
        candidate: [],
        editDragDisabled: false,
    };

    constructor(props) {
        super(props)
        this.candidateComponents = {}
        this.requirementComponents = {}
        this.findDictionaries()
        if (!this.dictionaries || this.dictionaries.length === 0) {
            GetDictionaries().then(response => {
                console.log('Dictionaries response ===>', response, this.state.requirements.length)
                try {
                    localStorage.setItem('dictionaries', JSON.stringify(response.data))
                    this.dictionaries = response.data
                } catch (error) {
                    localStorage.setItem('dictionaries', JSON.stringify([]))
                    this.dictionaries = []
                }
                if (this.state.requirements.length > 0) {
                    this.forceUpdate()
                }
            })
        }
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
        this.setState({ editDragDisabled: true })
    }
    onCandidateCopyClick = (candidate) => {
        console.log('onCandidateCopyClick', candidate);
        CreateCandidate(candidate).then(res => {
            OpenNotificationWithIcon('success', 'Notification', '复制成功')
            this.getRqs()
        }).catch(e => {
            OpenNotificationWithIcon('warning', 'Notification', '复制失败，请联系管理员')
        });
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
    onCandidateDelete = (requirement, coloum, index, obj) => {
        const { candidate } = this.state;
        candidate[requirement][coloum].splice(index, 1)
        this.setState({ candidate: candidate })
    }
    onRQEditDone = (index, obj) => {
        const { requirements } = this.state;
        requirements[index] = obj
        this.setState({ requirements: requirements })
    }

    componentDidMount() {
        this.getRqs()


    }

    findDictionaries = () => {
        if (!this.dictionaries || this.dictionaries.length === 0) {
            try {
                this.dictionaries = JSON.parse(localStorage.getItem('dictionaries'))
            } catch (error) {
                this.dictionaries = []
            }
        }
        console.log("use dictionary = ", this.dictionaries)
    }

    getInitialValFromDics = (key, cur) => {
        const result = this.dictionaries ? this.dictionaries[key].find(e => {
            return e.id === cur
        }) : null
        console.log("result....", result, key, cur)
        return result ? result.name : ""
    }
    getStatusInitialVal = (cur) => {
        const result = mapping[this.props.column].find(ele => {
            return ele.id == cur
        })
        if (result) {
            return result.name
        }
        return ""
    }

    showDetail() {
        console.log('show detail ....')
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const columes = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (const key in this.state.candidate) {
            this.state.candidate[key].forEach((element, index) => {
                columes[index] = columes[index] + element.length
            });
        }
        console.log("total ", columes)
        return (
            <div>
                <ToolBar onSave={this.handleSave} ref="toolbar" />
                <div className="panel border-tbl-radius border-tl-radius border-tbr-radius border-tr-radius" style={{ maxWidth: '100%', overflowX: 'auto', background: 'transparent' }}>
                    <table className="border-tr-radius border-tbr-radius" style={{ minWidth: '1235px', width: 'auto', background: '-webkit-linear-gradient(right, #3168ad, #0558a6)', minHeight: 500 }}>
                        <thead>
                            <tr>
                                <th className="divWidth gutter-box main-title">职位需求({this.state.requirements.length})
                                <span style={{ float: 'right', marginRight: 10 }}>
                                        <RequirementCreateForm
                                            onSaveRqDone={() => {
                                                this.getRqs()
                                            }}
                                        />
                                    </span>
                                </th>
                                <th className="divWidth gutter-box flow-title">简历筛选({columes[0]})</th>
                                <th className="divWidth gutter-box flow-title">内部面试({columes[1]})</th>
                                <th className="divWidth gutter-box flow-title">内部通过({columes[2]})</th>
                                <th className="divWidth gutter-box flow-title">推荐客户({columes[3]})</th>
                                <th className="divWidth gutter-box flow-title">安排客户({columes[4]})</th>
                                <th className="divWidth gutter-box flow-title">客户面试({columes[5]})</th>
                                <th className="divWidth gutter-box flow-title">客户通过({columes[6]})</th>
                                <th className="divWidth gutter-box flow-title">内部面试({columes[7]})</th>
                                <th className="divWidth gutter-box done-gradient border-tr-radius">入职({columes[8]})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.requirements.map((element, index) => {
                                    console.log('elementasd', element)
                                    const { rqtype } = element;
                                    let st = 'success'
                                    if (rqtype == 11) {
                                        st = 'error'
                                    } else if (rqtype == 12) {
                                        st = 'warning'
                                    } else if (rqtype == 13) {
                                        st = 'success'
                                    }
                                    return (
                                        <tr key={index} style={{ verticalAlign: 'top' }}>
                                            <td>
                                                <div className="requirementBox">
                                                    <Row>
                                                        <div style={{ float: 'right', marginRight: -5, height: 9 }}>
                                                            <Badge status={st} />
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
                                                            <label style={{ textAlign: 'center' }}> {element.requirement}</label>
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
                                                                    position={element.requirement}
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
                                            </td>
                                            <DragDropContext onDragEnd={this.onDragEnd1.bind(this, element)}>
                                                {
                                                    this.state.candidate[element.id] ?
                                                        this.state.candidate[element.id].map((cand, i) => {
                                                            return (
                                                                <td key={i} style={{ borderRight: "solid 1px #e6e5e5", paddingTop: 5 }} className={i == 8 ? "gutter-final-row" : "gutter-row"}>
                                                                    {this.state.candidate[element.id] ?
                                                                        <Droppable droppableId={DROPPABLE_KEY + element.id + DROPPABLE_SEPERATOR + i}>
                                                                            {(provided, snapshot) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    style={getListStyle(snapshot.isDraggingOver, i)}>
                                                                                    {this.state.candidate[element.id][i].map((item, j) => {
                                                                                        const hireMan = this.getInitialValFromDics(103, item.hiringmanager);
                                                                                        const salerMan = this.getInitialValFromDics(101, item.saler)
                                                                                        return (
                                                                                            <Draggable
                                                                                                key={item.id}
                                                                                                draggableId={item.id}
                                                                                                index={j}
                                                                                                isDragDisabled={this.state.editDragDisabled}>
                                                                                                {(provided, snapshot) => (
                                                                                                    <div ref={provided.innerRef}
                                                                                                        {...provided.draggableProps}
                                                                                                        {...provided.dragHandleProps}
                                                                                                        style={getCandidateStyle(
                                                                                                            snapshot.isDragging,
                                                                                                            provided.draggableProps.style,
                                                                                                            j
                                                                                                        )}
                                                                                                        className={i != 8 ? "candidateBox" : "candidateBoxWhite"}
                                                                                                    >
                                                                                                        <CandidateEditForm
                                                                                                            candidate={item}
                                                                                                            column={i}
                                                                                                            wrappedComponentRef={(reference) => {
                                                                                                                this.candidateComponents[item.id] = reference
                                                                                                            }}
                                                                                                            position={element.requirement}
                                                                                                            onUpdateDone={this.onEditDone.bind(this, element.id, i, j)}
                                                                                                            onDeleteCandidateDone={this.onCandidateDelete.bind(this, element.id, i, j)}
                                                                                                            onDismiss={() => {
                                                                                                                this.setState({ editDragDisabled: false })
                                                                                                            }}
                                                                                                        />
                                                                                                        <div className="left-middle-right" style={{ borderBottom: '1px solid white', paddingBottom: 3 }}>
                                                                                                            <Badge style={{ height: 20, flexGrow: 1 }} status="success" />
                                                                                                            <label style={{ fontSize: 12, flexGrow: 5, paddingTop: 1, width: 60 }} className="single-line-doc">{item.candidate}</label>
                                                                                                            <label style={{ fontSize: 12, flexGrow: 1, paddingTop: 1 }}> 6/2</label>
                                                                                                        </div>
                                                                                                        <div className="left-middle-right" style={{ paddingBottom: 3, marginTop: 3 }}>
                                                                                                            {/* <Icon type="search" style={{ flexGrow: 1, paddingTop: 3 }} /> */}
                                                                                                            <Icon type="user" style={{ flexGrow: 1, paddingTop: 3 }} />
                                                                                                            <label style={{ fontSize: 12, flexGrow: 5, paddingTop: 1, width: 60, paddingLeft: 3 }} className="single-line-doc">{hireMan}</label>
                                                                                                            <label style={{ fontSize: 12, flexGrow: 1, paddingTop: 1 }}> 6/2</label>
                                                                                                        </div>
                                                                                                        <div className="left-middle-right" style={{ paddingBottom: 3, marginTop: 3 }}>
                                                                                                            {/* <Icon type="man" style={{ flexGrow: 1, paddingTop: 3 }} /> */}
                                                                                                            <Icon type="exclamation-circle" style={{ flexGrow: 1, paddingTop: 3 }} />
                                                                                                            <label style={{ fontSize: 12, flexGrow: 5, paddingTop: 1, width: 60 }} className="single-line-doc">{salerMan}</label>
                                                                                                        </div>
                                                                                                        <Row>
                                                                                                            <div>
                                                                                                                <div>
                                                                                                                    <span style={{ float: 'right' }}>
                                                                                                                        <Icon type="form" style={{ display: i == 8 ? 'none' : 'block' }} className={i == 8 ? "ant-badge-status-dot" : ""} onClick={this.onCandidateClick.bind(this, item)} />
                                                                                                                    </span>
                                                                                                                    <span style={{ float: 'right', marginRight: 10 }}>
                                                                                                                        <Icon type="copy" style={{ display: i == 8 ? 'none' : 'block' }} className={i == 8 ? "ant-badge-status-dot" : ""} onClick={this.onCandidateCopyClick.bind(this, item)} />
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Row>
                                                                                                    </div>
                                                                                                )}
                                                                                            </Draggable>
                                                                                        )
                                                                                    })}
                                                                                    {provided.placeholder}
                                                                                </div>
                                                                            )}
                                                                        </Droppable> : (
                                                                            <div>

                                                                            </div>
                                                                        )}
                                                                </td>
                                                            )
                                                        })
                                                        : (<div></div>)
                                                }
                                            </DragDropContext>
                                        </tr>
                                    )
                                })
                            }
                            <tr style={{ height: 20 }} key={10000}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="gutter-final-row border-tbr-radius" ></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default Home

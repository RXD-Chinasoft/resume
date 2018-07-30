import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import qs from 'qs';
import { Row, Col, List, message, Avatar, Spin, Icon, Table } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './chart.css'

const summaries = [
  { description: '6月较8月人均Offer数总体下降', start: 0 },
  { description: 'MSC6月人均简历量和Offer量大幅度提升', start: 1 },
  { description: 'C&E及US人均简历量和Offer均大幅度下降', start: 2 },
  { description: 'AI&R虽人均简历量有所下降，但人均Offer量大幅度提升', start: 1 },
]

const columns = [{
  title: '项目',
  dataIndex: 'project',
  className: 'project-bg',
  // render: text => <label style={{ backgroundColor: 'yellow' }}>{text}</label>,
}, {
  title: '总缺口(含Offer)',
  className: 'column-quekou',
  dataIndex: 'values.quekou',
}, {
  title: '承诺目标',
  dataIndex: 'values.goal',
}, {
  title: '实际入职',
  dataIndex: 'values.injob',
}, {
  title: '6月Offer',
  dataIndex: 'values.juneoffer',
}, {
  title: '6月配置人力',
  dataIndex: 'values.juneresource',
}, {
  title: '5月配置人力',
  dataIndex: 'values.mayoffer',
}];

const data = [
  { key: '1', project: 'MCS', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '2', project: 'AI&R', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '3', project: 'AI战略', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '4', project: 'C&E', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '5', project: 'WDG', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '6', project: 'C&E-XA', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '7', project: 'US', values: { quekou: 35, goal: 20, injob: 3, juneoffer: 23, juneresource: 3, mayoffer: 3 } },
  { key: '8', project: '总数', values: { quekou: 245, goal: 140, injob: 21, juneoffer: 175, juneresource: 21, mayoffer: 21 } },
]

class ChartResultConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    teamOpt: this.getTeamOption(),
  });

  getTeamOption = () => ({
    color: ['#003366', '#006699'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      show: false
    },
    title: {
      text: '招聘团队人均简历量',
      left: 'center',
      padding: 15
    },
    legend: {
      data: ['五月每岗简历量', '六月每岗简历量'],
      bottom: 0
    },
    xAxis: [
      {
        type: 'category',
        data: ['AI战略', 'C&E', 'AI&R', 'MICS', 'US', 'C&E-XA', 'WDG'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: {
      type: 'value',
      name: '',
      min: 0,
      interval: 50,
      axisLabel: {
        formatter: '{value}'
      }
    },
    calculable: true,
    series: [
      {
        name: '五月',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
        barGap: 0,
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      },
      {
        name: '六月',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
        barGap: 0,
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      }
    ]
  });

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <div>
            <div>
              <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
                title={() => <p style={{ fontSize: 20 }}>{'招聘结果及人力配置情况'}</p>}
                footer={() => ''}
              />
            </div>
            <Row>
              <Col span={12}>
                <ReactEcharts ref='area_team'
                  option={this.state.teamOpt}
                  style={{ height: 300 }} />
              </Col>
              <Col span={12} style={{ paddingTop: 20, paddingLeft: 36 }}>
                <span style={{ fontSize: 20 }}>
                  <Icon type="info-circle" />人力资源配置情况
                </span>
                <div style={{ fontSize: 20 }}>
                  <Icon type="exclamation-circle" style={{ fontSize: 10, marginRight: 10 }} />国内招聘团队整体人力配置与上月相差不大，US大幅度降低，需要寻求更多销售机会
                </div>
              </Col>
            </Row>
          </div>

        </div>
      </div>
    );
  }
}

export default ChartResultConfiguration
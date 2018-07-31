import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import qs from 'qs';
import { Row, Col, List, message, Avatar, Spin, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const summaries = [
  { description: '6月较8月人均Offer数总体下降', start: 0 },
  { description: 'MSC6月人均简历量和Offer量大幅度提升', start: 1 },
  { description: 'C&E及US人均简历量和Offer均大幅度下降', start: 2 },
  { description: 'AI&R虽人均简历量有所下降，但人均Offer量大幅度提升', start: 1 },
]

class ChartRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    jobOpt: this.getJobOption(),
    offerOpt: this.getOfferOption(),
    teamOpt: this.getTeamOption(),
  });

  getJobOption = () => ({
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
      text: '新增需求-6月',
      left: 'center',
      padding: 15
    },
    legend: {
      show: false
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
      interval: 20,
      axisLabel: {
        formatter: '{value}'
      }
    },
    calculable: true,
    series: [
      {
        name: '六月',
        type: 'bar',
        data: [10, 20, 30, 50, 70, 80, 90],
        barGap: 0,
        markLine: {
          data: [
            { type: 'average', name: '平均值' }
          ]
        }
      }
    ]
  });

  getOfferOption = () => ({
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
      text: '每周关闭需求数6月',
      left: 'center',
      padding: 15
    },
    legend: {
      data: ['MSIC', 'C&E', 'AI', 'WDG', 'US'],
      bottom: 0
    },
    xAxis: [
      {
        type: 'category',
        data: ['Week1', 'Week2', 'Week3', 'Week4', '总计'],
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
        name: 'MSIC',
        type: 'bar',
        data: [23.2, 25.6, 76.7, 135.6, 88]
      },
      {
        name: 'C&E',
        type: 'bar',
        data: [5.9, 9.0, 28.7, 175.6, 88]
      },
      {
        name: 'AI',
        type: 'bar',
        data: [0, 9.0, 0, 50, 88]
      },
      {
        name: 'WDG',
        type: 'bar',
        data: [10, 90.0, 10, 80, 88]
      },
      {
        name: 'US',
        type: 'bar',
        data: [0, 9.0, 0, 50, 88]
      }
    ]
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
            <Row>
              <Col span={12}>
                <ReactEcharts ref='area_one'
                  option={this.state.jobOpt}
                  style={{ height: 300 }} />
              </Col>
              <Col span={12}>
                <ReactEcharts ref='area_two'
                  option={this.state.offerOpt}
                  style={{ height: 300 }} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <ReactEcharts ref='area_three'
                  option={this.state.teamOpt}
                  style={{ height: 300 }} />
              </Col>
              <Col span={12} style={{ paddingTop: 50, paddingLeft: 36 }}>
                <List
                  dataSource={summaries}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={<Avatar icon="eye" style={{ backgroundColor: '#f56a00' }} />}
                        title={<a href="https://ant.design">{item.description}</a>}
                      />
                      {
                        item.start > 0 ? item.start === 1 ? <Icon type="like" style={{ color: '#f56a00', marginRight: 15, fontSize: 20 }} />
                          : <Icon type="dislike" style={{ color: '#ffbf00', marginRight: 15, fontSize: 20 }} /> : (<div></div>)
                      }
                    </List.Item>
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
              </Col>
            </Row>
          </div>

        </div>
      </div>
    );
  }
}

export default ChartRequirement
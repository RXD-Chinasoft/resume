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
    requirementOpt: this.getRequirementOption()
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
        data: [10, 20, 30, 55, 70, 80, 90],
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

  getRequirementOption = () => ({
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Speech'],
        [57.1, 78254, 'US'],
        [74.4, 41032, 'AI'],
        [50.1, 12755, 'C&E'],
        [89.7, 20145, 'MCS'],
        [68.1, 79146, 'MACH'],
        [19.6, 91852, 'VSP'],
      ]
    },
    grid: { containLabel: true },
    xAxis: { name: ' ' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['', ''],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#D7DA8B', '#E15457']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
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
                {/* <ReactEcharts ref='area_three'
                  option={this.state.teamOpt}
                  style={{ height: 300 }} /> */}
                <span style={{ fontSize: 20, paddingLeft: 20 }}>
                  <Icon type="info-circle" />说明
                </span>
                <div style={{ fontSize: 20, paddingLeft: 30 }}>
                  新增需求按每周累计，不包括新开又关闭的情况
                </div>
                <span style={{ fontSize: 25, paddingLeft: 20 }}>
                  <Icon type="info-circle" />需求不稳定
                </span>
                <div style={{ fontSize: 20, paddingLeft: 30 }}>
                  新增需求多的项目，如MCS，AI战略，开的多关的也多，均超过一半
                </div>
              </Col>
              <Col span={12} style={{ paddingTop: 50, paddingLeft: 36 }}>
                <div style={{ fontSize: 20, paddingLeft: 150, color: 'black' }}>
                  需求满足度（4月起）
                </div>
                <ReactEcharts ref='area_three'
                  option={this.state.requirementOpt}
                  style={{ height: 300 }} />
                {/* <List
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
                </List> */}
              </Col>
            </Row>
          </div>

        </div>
      </div>
    );
  }
}

export default ChartRequirement
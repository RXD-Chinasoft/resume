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

class ChartResumeInterviewTrace extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    jobOpt: this.getJobOption(),
    offerOpt: this.getOfferOption(),
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
      text: '招聘过程有效性6月',
      left: 'center',
      padding: 15
    },
    legend: {
      data: ['MSC', 'AI战略', 'C&E', 'WDG', 'US', 'MS整休'],
      bottom: 0
    },
    xAxis: [
      {
        type: 'category',
        data: ['内部通过率', '客面简历通过率', '客面通过率', 'Offer率'],
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
        name: 'MSC',
        type: 'bar',
        data: [23.2, 25.6, 76.7, 135.6]
      },
      {
        name: 'AI战略',
        type: 'bar',
        data: [5.9, 9.0, 28.7, 175.6]
      },
      {
        name: 'C&E',
        type: 'bar',
        data: [0, 9.0, 0, 50]
      },
      {
        name: 'WDG',
        type: 'bar',
        data: [10, 90.0, 10, 80]
      },
      {
        name: 'US',
        type: 'bar',
        data: [0, 9.0, 0, 50]
      },
      {
        name: 'MS整休',
        type: 'bar',
        data: [10, 90.0, 10, 80]
      }
    ]
  });

  getOfferOption = () => ({
    color: ['#de8627a6', '#cc3322a6'],
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
      text: '简历转化率6月',
      left: 'center',
      padding: 15
    },
    legend: {
      data: ['5月人均Offer', '6月人均Offer'],
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
                <span style={{ fontSize: 20, paddingLeft: 20  }}>
                  <Icon type="info-circle" />说明
                </span>
                <div style={{ fontSize: 20, paddingLeft: 30 }}>
                  因WDG、US无内面数据，AI&R无客面数据，故已剔除
                </div>
              </Col>
              <Col span={12} style={{ paddingTop: 200, paddingLeft: 20 }}>
                <span style={{ fontSize: 20 }}>
                  <Icon type="info-circle" />人力资源配置情况
                </span>
                <div style={{ fontSize: 20 }}>
                  <Icon type="exclamation-circle" style={{ fontSize: 10, marginRight: 10 }} />国内招聘团队整体人力配置与上月相差不大，US大幅度降低，需要寻求更多销售机会
                </div>
                <div style={{ fontSize: 20 }}>
                  <Icon type="exclamation-circle" style={{ fontSize: 10, marginRight: 10 }} />WCD6月份无Offer，已经展开ARR
                </div>
                <ReactEcharts ref='area_two'
                  option={this.state.offerOpt}
                  style={{ height: 300 }} />
              </Col>
            </Row>
          </div>

        </div>
      </div>
    );
  }
}

export default ChartResumeInterviewTrace
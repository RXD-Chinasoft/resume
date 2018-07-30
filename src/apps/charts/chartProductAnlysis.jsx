import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import qs from 'qs';

class ChartProductAnlysis extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({ option: this.getOption() });

  getOption = () => ({
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
      text: '每岗平均简历量',
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
    calculable : true,
    series: [
      {
        name: '五月',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
        barGap: 0,
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        }
      },
      {
        name: '六月',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
        barGap: 0,
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        }
      }
    ]
  });

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts ref='echarts_react'
            option={this.state.option}
            style={{ height: 600 }} />
        </div>
      </div>
    );
  }
}

export default ChartProductAnlysis
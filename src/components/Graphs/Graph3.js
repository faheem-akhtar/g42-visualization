/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Graph container component
*/
import React, { Component } from 'react'

import LineChart from '../LineChart'
import Filters from '../Filters'
import { seriesModel } from '../../models'
import { formatDate } from '../../util'

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      start: formatDate(),
      end: formatDate()
    }
  }

  mapData = data => data.filter(item => item.value !== '.')
    .map((item, index) => ({
      label: index + 1,
      value: parseFloat(item.value) || 0
    }))

  fetchData = (start, end) => {
    const line1 = seriesModel.get(['observations'], {
      series_id: 'DGS10',
      realtime_start: start,
      realtime_end: end,
      limit: 3000
    })
    const line2 = seriesModel.get(['observations'], {
      series_id: 'T10YIE',
      realtime_start: start,
      realtime_end: end,
      limit: 3000
    })

    Promise.all([ line1, line2 ]).then(([line1Res, line2Res]) => {
      const data1 = this.mapData(line1Res.data.observations)
      const data2 = this.mapData(line2Res.data.observations)
      const difference = data1.map((item, index) => ({...item, value: item.value - data2[index].value}))
      this.setState({ data: [data1, data2, difference] })
    })
  }

  componentDidMount () {
    this.fetchData(this.state.start, this.state.end)
  }

  render () {
    const { start, end, data } = this.state

    return (
      <div>
        {data && <LineChart
          data={data}
          lineProps={[
            {
              stroke: '#005b96',
              strokeWidth: '1px',
              opacity: '.5'
            },
            {
              stroke: '#005b96',
              strokeWidth: '1px',
              opacity: '.5'
            },
            {
              stroke: '#005b96',
              strokeWidth: '2px'
            }
          ]}
        />}
        <hr />
        <Filters
          fields={{realtime_start: start, realtime_end: end}}
          onSubmit={({realtime_start, realtime_end}) => {
            this.fetchData(realtime_start, realtime_end)
          }}
        />
      </div>
    )
  }
}

export default Graph

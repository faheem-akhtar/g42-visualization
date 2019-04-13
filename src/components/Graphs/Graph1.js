/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Graph container component
*/
import React, { Component } from 'react'

import LineAreaChart from '../LineAreaChart'
import Filters from '../Filters'
import { seriesModel } from '../../models'
import { formatDate } from '../../util'

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      // start: formatDate(((new Date()).getFullYear() - 20).toString()),
      start: formatDate(),
      end: formatDate()
    }
  }

  fetchData = (start, end) => {
    seriesModel.get(['observations'], {
      series_id: 'T10Y2Y',
      realtime_start: start,
      realtime_end: end
    }).then(({ data }) => {
      const plotData = data.observations || []
      this.setState({ data: plotData.map((item, index) => ({
        // label: `${(new Date(item.realtime_start)).getFullYear()} - ${(new Date(item.realtime_end)).getFullYear()}`,
        label: index + 1,
        value: parseFloat(item.value) || 0
      })).filter(item => item.value > 0) })
    })
  }

  componentDidMount () {
    this.fetchData(this.state.start, this.state.end)
  }

  render () {
    const { start, end, data } = this.state

    return (
      <div>
        {data && <LineAreaChart
          data={data}
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

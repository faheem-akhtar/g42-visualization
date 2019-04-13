/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Line Area general purpose chart.
*/
import React from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { max, min } from 'd3-array'
import { select } from 'd3-selection'
import { area } from 'd3'

// import Bar from './Bar'
import './style.css'

const LineAreaChart = ({
  canvasHeight = 600,
  data = []
}) => {
  const canvasWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 80;
  const margin = { top: 20, right: 10, bottom: 20, left: 10 }
  const width = canvasWidth - margin.left - margin.right
  const height = canvasHeight - margin.top - margin.bottom

  const scaleX = scaleBand().range([0, width]).domain(data.map(item => item.label))
  const scaleY = scaleLinear().range([height, 0]).domain([Math.min(0, min(data, item => item.value)), max(data, item => item.value)])

  const graphArea = area()
    .x(d => scaleX(d.label))
    .y0(scaleY(0))
    .y1(d => scaleY(d.value))

  return (
    <div className="barchart">
      <svg width={canvasWidth} height={canvasHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            className="barchart-axis--x"
            transform={`translate(0, ${height})`}
            ref={node => select(node).call(axisBottom(scaleX))}
          />
          <g
            className="barchart-axis--y"
            ref={node => select(node).call(axisLeft(scaleY))}
          />
          <path
            fill="steelblue"
            d={graphArea(data)}
          />
          {/* {data.map((item, index) => (
            <Bar
              key={index}
              posX={scaleX(item.label)}
              posY={scaleY(item.value)}
              width={scaleX.bandwidth()}
              height={height - scaleY(item.value)}
            />
          ))} */}
        </g>
      </svg>
    </div>
  )
}

export default LineAreaChart

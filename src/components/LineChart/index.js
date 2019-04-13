/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description General purpose Line Chart. It will support multi lines.
*/
import React from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { max, min } from 'd3-array'
import { select } from 'd3-selection'
import { line } from 'd3'

// import Bar from './Bar'
import './style.css'

const LineAreaChart = ({
  canvasHeight = 600,
  data = [],
  lineProps = []
}) => {
  const canvasWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 80;
  const margin = { top: 20, right: 10, bottom: 20, left: 10 }
  const width = canvasWidth - margin.left - margin.right
  const height = canvasHeight - margin.top - margin.bottom

  const flatData = data.reduce((acc, item) => [...acc, ...item], [])
  const scaleX = scaleBand().range([0, width]).domain(data[0].map(item => item.label))
  const scaleY = scaleLinear().range([height, 0]).domain([Math.min(0, min(flatData, item => item.value)), max(flatData, item => item.value)])

  const graphLine = line()
    .x(d => scaleX(d.label))
    .y(d => scaleY(d.value))
    // .curve(curveCatmullRom.alpha(0.5))
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
          {data.map((item, index) => (
            <path
              key={index}
              stroke="steelblue"
              strokeWidth="2px"
              {...(lineProps[index] || {})}
              fill="none"
              d={graphLine(item)}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default LineAreaChart

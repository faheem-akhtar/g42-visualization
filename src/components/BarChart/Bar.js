/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Single Bar for the Bar Chat.
*/
import React from 'react'

export default ({
  width,
  height,
  color = '#005b96',
  posX = 0,
  posY = 0
}) => {
  return (
    <rect
      width={width}
      height={height}
      fill={color}
      x={posX}
      y={posY}
    />
  )
}

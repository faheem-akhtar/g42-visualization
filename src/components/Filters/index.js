/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description A Form that provide filters options
*/
import React, { Component } from 'react'

import './style.css'

class Filters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      fields: {
        realtime_start: '',
        realtime_end: ''
      }
    }
  }

  changeHandler = event => {
    const { fields } = this.state
    const name = event.target.name
    const value = event.target.value

    this.setState({ fields: {...fields, [name]: value} })
  }

  isFieldValid = fields => {
    if (!fields.realtime_start || !fields.realtime_end) {
      return false
    }
    const startDate = new Date(fields.realtime_start)
    const endDate = new Date(fields.realtime_end)
    if (startDate.getTime() > endDate.getTime()) {
      return false
    }
    return true
  }

  onSubmit = event => {
    event.preventDefault()
    const { fields } = this.state
    let error = true
    if (this.isFieldValid(fields)) {
      this.props.onSubmit(fields)
      error = false
    }
    this.setState({ error })
  }

  componentDidMount () {
    const { fields } = this.props
    if (fields && Object.keys(fields).length) {
      this.setState({ fields: {...fields} })
    }
  }

  render () {
    const { fields, error } = this.state

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form-field">
          <label className="form-field-label" htmlFor="realtime_start">Start</label>
          <input
            className={`form-field-text${error ? ' error' : ''}`}
            name="realtime_start"
            id="realtime_start"
            type="date"
            value={fields.realtime_start}
            onChange={this.changeHandler}
          />
        </div>
        <div className="form-field">
          <label className="form-field-label" htmlFor="realtime_end">End</label>
          <input
            className={`form-field-text${error ? ' error' : ''}`}
            name="realtime_end"
            id="realtime_end"
            type="date"
            value={fields.realtime_end}
            onChange={this.changeHandler}
          />
        </div>
        <div className="form-field">
          <button className="form-button">Submit</button>
        </div>
      </form>
    )
  }
}

export default Filters

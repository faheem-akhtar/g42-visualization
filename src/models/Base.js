/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Base model that fetch data from backend.
*/
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

class BaseModel {
  constructor(options = {}) {
    this.options = {
      uri: '',
      name: ''
    }
    Object.assign(this.options, options)
    if (!this.options.name) {
      throw new Error('Model name is missing')
    }
  }
  get(segments = [], data = {}) {
    let { uri } = this.options

    // to make segments argument optional
    if (!Array.isArray(segments)) {
      data = segments
      segments = []
    }
    uri = segments.length ? `${uri}/${segments.join('/')}` : uri

    return api.get(uri, { params: data }).then(data => {
      return data
    })
  }
  // TODO: post, put, delete functions goes here
}

export default BaseModel

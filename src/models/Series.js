/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description The specific Series model.
*/
import BaseModel from './Base'

class SeriesModel extends BaseModel {
  constructor () {
    super({ uri: '/series', name: 'SeriesModel' })
  }
}

export default new SeriesModel()

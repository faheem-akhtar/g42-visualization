/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Usefull utility functions
*/
export const formatDate = (d = new Date()) => {
  const date = typeof d === 'string' ? new Date(d) : d
  let month = '' + (date.getMonth() + 1),
      day   = '' + date.getDate(),
      year  = date.getFullYear()
  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-');
}

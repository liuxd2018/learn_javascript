// formatting dates

// (date, format_string) => string

const format = require('date-fns/format');


const stPattysDay = new Date('2020/03/17');

const dayStr1 = format(stPattysDay, 'MM/dd/yyyy')
const dayStr2 = format(stPattysDay, 'MMMM dd, yyyy')

console.log(dayStr1)
console.log(dayStr2)

// using locales

const chineseLocale = require('date-fns/locale/zh-CN')

const formattedDateStr = format(stPattysDay, 'MMMM dd, yyyy', {locale: chineseLocale});

console.log(formattedDateStr)


const dayjs = require('dayjs');

const daysStr = dayjs(stPattysDay).format();
console.log(daysStr);
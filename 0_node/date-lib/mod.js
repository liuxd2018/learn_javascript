const {format} = require('date-fns')

const stPattysDay = new Date('2020/03/17');

const dayStr1 = format(stPattysDay, 'MM/dd/yyyy')
const dayStr2 = format(stPattysDay, 'MMMM dd, yyyy')

console.log(dayStr1)
console.log(dayStr2)

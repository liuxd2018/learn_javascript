const print = require('./cjsmodule.js');

print('hello')
print.log('hello')

const {log} = require('./cjsmodule.js')
log('hello')
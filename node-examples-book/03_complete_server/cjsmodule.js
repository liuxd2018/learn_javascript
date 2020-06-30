// assign the exported object to `module.exports`
// can be assigned once
module.exports = (str) => console.log(str)
// modify the exported function
module.exports.log = (str) => console.log(`logging... ${str}`)

// same to
function print(str) {
    console.log(str)
}
print.log = (str) => console.log(`logging... ${str}`)
module.exports = print
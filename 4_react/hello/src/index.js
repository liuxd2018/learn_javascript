import React from 'react'
import ReactDOM from 'react-dom'


// stateless function components
function HelloWorld() {
    return (
        <div>
            <Hello/> <World hello="你好"/>!
        </div>
        
    )
}

function Hello() {
    return (
        <span>Hello</span>
    )
}

function World(props) {
    return (
        <span data-hello="{props.hello}世界">World!</span>
    )
}

// other two ways to create components
// 1. es6 classes
// 2. React.createClass


// ReactDOM.render([React Element], [DOM element])
ReactDOM.render(
    <HelloWorld/>,
    document.querySelector('#root')
);
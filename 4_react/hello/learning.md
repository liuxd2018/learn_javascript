# JSX

each JSX element becomes a function call (through Babel)

```jsx
function Hello() {
    return <span>Hello!</span>
}
// ===
function Hello() {
    return React.createElement(
        'span',
        {},
        'Hello!'
    );
}
```

React.createElement(
    string|element, // a string describing an HTML or SVG tag, or it can be a component a.k.a. function
    [propsObject],
    [children ...]
)


```jsx
function ManyChildren() {
    return React.createElement('div', {},
        React.createElement('div', {}, 'Child1'),
        React.createElement('div', {}, 'Child2',
            React.createElement('div', {}, 'Child2_Child')
        )

    );
}

function ManyChildren() {
    return (
        <div>
            <div>Child1</div>
            <div>
                Child2
                <div>Child2_Child</div>
            </div>
        </div>
    );
}

function SongName(props) {
    return (
        <span className='song-name'>
            {props.song.name}
        </span>
    );
}

function SongName(props) {
    return (
        React.createElement('span',
            {className: 'song-name'},
            props.song.name
        )
    );
}
```

## adjacent jsx elements

```jsx
function HelloWorld() {
    return (
        <div>
            <Hello/> <World/>!
        </div>
    );
}

// this is wrong
function HelloWorld() {
    return (<Hello/> <World/>);
}

function HelloWorld() {
    return [<Hello/>, <World/>];
}

function NameCells() {
    return (
        <React.Fragment>
            <td>First Name</td>
            <td>Last Name</td>
        </React.Fragment>
    );
}

// <></> syntax
function NameCells() {
    return (
        <>
            <td>First Name</td>
            <td>Last Name</td>
        </>
    );
}

```
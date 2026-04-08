import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Greeting = (props) => <h2>Hello, {props.name}!</h2>; // JSX and Props (10b, 10c)

const App = () => {
    const [count, setCount] = useState(0); // State (10c)
    return (
        <div> {/* HTML rendering (10a) */}
            <Greeting name="Student" />
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
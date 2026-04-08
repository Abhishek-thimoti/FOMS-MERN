import React, { useState } from 'react';

const App = () => {
    const [show, setShow] = useState(true);
    const items = ['React', 'Express', 'MongoDB'];

    return (
        <div>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show ? <p>Visible Content (11a)</p> : <p>Hidden</p>}
            
            <ul>
                {items.map((item, index) => <li key={index}>{item} (11b)</li>)}
            </ul>
        </div>
    );
};
export default App;
import React, { useState, createContext, useContext } from 'react';

// Context for Sharing Data (12b)
const TodoContext = createContext();

const TodoList = () => {
    const { todos } = useContext(TodoContext); // Hooks usage (12a)
    return <ul>{todos.map((t, i) => <li key={i}>{t}</li>)}</ul>;
};

const App = () => {
    const [todos, setTodos] = useState([]); // Hook (12a)
    const [input, setInput] = useState("");

    const addTodo = () => { setTodos([...todos, input]); setInput(""); };

    // To-Do App Design (12c)
    return (
        <TodoContext.Provider value={{ todos }}>
            <div>
                <h2>To-Do List</h2>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={addTodo}>Add</button>
                <TodoList />
            </div>
        </TodoContext.Provider>
    );
};
export default App;
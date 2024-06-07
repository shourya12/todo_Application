// src/App.js
import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <div>
            <h1>To-Do List Manager</h1>
            <TaskList />
        </div>
    );
};

export default App;

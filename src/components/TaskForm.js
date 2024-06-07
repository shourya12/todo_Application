import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (label.length > 20) {
            alert("Label should be less than 20 characters.");
            return;
        }

        if (description.length > 100) {
            alert("Description should be less than 50 characters.");
            return;
        }

        const response = await axios.post('http://localhost:8080/api/tasks/create', {
            label,
            description,
            dueDate,
            completed: false,
        });
        onTaskAdded(response.data);
        setLabel('');
        setDescription('');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                placeholder="Label"
                className="form-control mr-6"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                maxLength={20}
            />
            <input
                type="text"
                placeholder="Description"
                className="form-control mr-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={100}
            />
            <input
                type="date"
                className="form-control mr-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
};

export default TaskForm;

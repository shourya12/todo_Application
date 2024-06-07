import React from 'react';
import axios from 'axios';
import './TaskItem.css';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const handleToggleCompleted = async () => {
        const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
            ...task,
            completed: !task.completed,
        });
        onTaskUpdated(response.data);
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8080/api/tasks/${task.id}`);
        onTaskDeleted(task.id);
    };

    return (
        <div className="task-item">
            <div className="task-content">
                <div className="task-label">{task.label}</div>
                <div className="task-description">{task.description}</div>
                <div className="task-date">{task.dueDate}</div>
            </div>
            <div className="task-actions">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggleCompleted}
                />
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;

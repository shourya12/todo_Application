import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ value: 'all', label: 'All' });

    useEffect(() => {
        const fetchTasks = async () => {
            let url = 'http://localhost:8080/api/tasks/';
            if (filter.value === 'pending') {
                url += 'pending';
            } else if (filter.value === 'completed') {
                url += 'completed';
            } else {
                url += 'all';
            }
            const response = await axios.get(url);
            setTasks(response.data);
        };
        fetchTasks();
    }, [filter]);

    const handleTaskAdded = (task) => {
        setTasks([...tasks, task]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption);
    };

    return (
        <div className="task-list-container">
            <div className="task-form-grid">
                <TaskForm onTaskAdded={handleTaskAdded} />
            </div>
            <div className="task-filter-grid">
                <TaskFilter selectedOption={filter} onFilterChange={handleFilterChange} />
            </div>
            <div className="task-list-grid">
                <TransitionGroup>
                    {tasks.map(task => (
                        <CSSTransition key={task.id} timeout={500} classNames="task">
                            <TaskItem
                                task={task}
                                onTaskUpdated={handleTaskUpdated}
                                onTaskDeleted={handleTaskDeleted}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default TaskList;

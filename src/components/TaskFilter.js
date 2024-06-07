import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
];

const TaskFilter = ({ selectedOption, onFilterChange }) => {
    return (
        <Select
            value={selectedOption}
            onChange={onFilterChange}
            options={options}
            className="task-filter"
        />
    );
};

export default TaskFilter;

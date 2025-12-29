import React from "react";
import TaskEmtyState from "./TaskEmtyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filterTasks, filter, handleTaskChange }) => {
    if (!filterTasks || filterTasks.length === 0) {
        return <TaskEmtyState filter={filter} />;
    }

    return (
        <div className="space-y-3">
            {filterTasks.map((task, index) => (
                <TaskCard
                    key={task._id ?? index}
                    task={task}
                    index={index}
                    handleTaskChange={handleTaskChange}
                />
            ))}
        </div>
    );
};

export default TaskList;

import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { ToDo } from './ToDo';

export const ToDoList = () => {
    const { tasks, getTasks } = useContext(GlobalContext);

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return (
        <>
        <h3 className="underline">List of Task</h3>
        <ul className="list">
            {tasks
            .filter(task => !task.completed)
            .map(task => (<ToDo key={task.id} task={task}/>))}
        </ul>
        </>
    )
}
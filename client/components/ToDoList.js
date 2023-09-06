import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { ToDo } from './ToDo';

export const ToDoList = () => {
    const { tasks } = useContext(GlobalContext);

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
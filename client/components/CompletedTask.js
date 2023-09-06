import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { ToDo } from './ToDo';

export const CompletedTask = () => {
    const { tasks } = useContext(GlobalContext);

    return (
        <>
        <h3 className="underline">Completed Tasks</h3>
        <ul className="list">
                {tasks
                .filter(task => task.completed)
                .map(task => (<ToDo key={task.id} task={task}/>))}
            </ul>
        </>
    )

}
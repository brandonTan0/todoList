import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const ToDo = ({ task }) => {
    const { completedTask, undoComplete, deleteTask } = useContext(GlobalContext);
    const completeFunction = task.completed ?  undoComplete : completedTask;
    const option = task.completed ? 'fas fa-undo' : 'fa-solid fa-check';

    return (
        <>
        <li>
            {task.text}
            <button onClick={() => {completeFunction(task._id)}} className="completed-btn">
                <i className={option}></i>
            </button>
            <button onClick={() => {deleteTask(task._id)}} className='delete-btn'>
                <i className="fa fa-remove"></i>
            </button>
        </li>
        </>
    )
}
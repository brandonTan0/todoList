import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddNewTask = () => {
    const [text, setText] = useState('');

    const { addNewTask } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTask = {
            text,
            completed: false
        }
        addNewTask(newTask);

        setText('');
    }

    return (
        <>
        <h3 className="underline">Add New Task</h3>
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <input type="text" value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter Task..."/>
            </div>
            <button className='submit-btn'>Add Task</button>
        </form>
        </>
    )
}

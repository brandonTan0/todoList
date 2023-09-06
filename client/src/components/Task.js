import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Task = () => {
    const { tasks } = useContext(GlobalContext);

    return (
        <div className="numTask">
            Total Task: <span className="highlighted">{tasks.length}</span>  <i className="fa-solid fa-pen-nib"></i>
        </div>
    );
}
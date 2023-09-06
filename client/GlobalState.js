import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
    tasks: [
        // { id: 1, text: "Buy groceries", completed: false },
        // { id: 2, text: "Finish project", completed: false },
        // { id: 3, text: "Go to the gym", completed: true },
        // { id: 4, text: "Read a new book", completed: false },
        // { id: 5, text: "Attend a coding workshop", completed: false },
        // { id: 6, text: "Write a blog post", completed: false }
    ]
}

//Create Global Context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    function completedTask(id) {
        dispatch ({
            type: 'COMPLETED_TASK',
            payload: id
        });
    }

    function undoComplete(id) {
        dispatch ({
            type: 'UNDO_COMPLETE',
            payload: id
        });
    }

    function deleteTask(id) {
        dispatch ({
            type: 'DELETE_TASK',
            payload: id
        });
    }

    function addNewTask(task) {
        dispatch ({
            type: 'ADD_NEW_TASK',
            payload: task
        });
    }

    return (<GlobalContext.Provider value={{
        tasks:state.tasks,
        completedTask,
        undoComplete,
        addNewTask,
        deleteTask
    }}>
        {children}
    </GlobalContext.Provider>);
}

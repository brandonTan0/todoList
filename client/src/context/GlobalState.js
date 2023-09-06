import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
    tasks: [],
    error: null,
    loading: true
}

//Create Global Context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTasks() {
        try {
            const response = await fetch('/api/v1/tasks');

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();

            dispatch ({
                type: 'GET_TASKS',
                payload: data.data
            });

        } catch (err) {
            dispatch ({
                type: 'TASK_ERROR',
                payload: err.error
            });
        }
    }

    async function completedTask(id) {
        try {
            const response = await fetch(`/api/v1/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: true })
            });

            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }
            dispatch ({
                type: 'COMPLETED_TASK',
                payload: id
            });

        } catch (err) {
            dispatch ({
                type: 'TASK_ERROR',
                payload: err.error
            });
        }
    }

    async function undoComplete(id) {
        try {
            const response = await fetch(`/api/v1/tasks/${id}/undo`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ completed: false })
            });

            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }
            dispatch({
                type: 'UNDO_COMPLETE',
                payload: id
            });
        } catch(err) {
            dispatch({
                type: 'TASK_ERROR',
                payload: err.error
            });

        }
    }

    async function deleteTask(id) {
        console.log(`/api/v1/tasks/${id}`);
        try {
            const response = await fetch(`/api/v1/tasks/${id}`, {
                method: 'DELETE',
                Headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(!response.ok) {
                const errorData = response.json();
                throw new Error(errorData.error);
            }
            dispatch ({
                type: 'DELETE_TASK',
                payload: id
            })

        } catch(err) {
            dispatch ({
                type: 'TASK_ERROR',
                payload: err.error
            });
        }
    }

    async function addNewTask(task) {
        try {
            const response = await fetch('/api/v1/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            dispatch ({
                type: 'ADD_NEW_TASK',
                payload: data.data, ...task
            });
        } catch (err) {
            console.log(err);
            dispatch ({
                type: 'TASK_ERROR',
                payload: err.error
            });
        }
    }

    return (<GlobalContext.Provider value={{
        tasks:state.tasks,
        error: state.error,
        loading: state.loading,
        getTasks,
        completedTask,
        undoComplete,
        addNewTask,
        deleteTask
    }}>
        {children}
    </GlobalContext.Provider>);
}

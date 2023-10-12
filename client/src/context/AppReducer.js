const appReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                loading: false,
                tasks: action.payload
            }
        case 'COMPLETED_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task._id ===
                    action.payload ? {...task, completed: true} : task)
            }
        case 'UNDO_COMPLETE':
            return {
                ...state,
                tasks: state.tasks.map(task => task._id ===
                    action.payload ? {...task, completed: false} : task)
            }
        case 'ADD_NEW_TASK':
            return {
                ...state,
                tasks: [ ...state.tasks, action.payload]
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(tasks => tasks._id !== action.payload)
            }
        case 'TASK_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
export default appReducer;
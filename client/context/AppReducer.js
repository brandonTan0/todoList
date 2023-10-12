const appReducer = (state, action) => {
    switch(action.type) {
        case 'COMPLETED_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id ===
                    action.payload ? {...task, completed: true} : task)
            }
        case 'UNDO_COMPLETE':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id ===
                    action.payload ? {...task, completed: false} : task)
            }
        case 'ADD_NEW_TASK':
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(tasks => tasks.id !== action.payload)
            }
        default:
            return state
    }
}
export default appReducer;


/* Initial State of the User's Authentication */
export const Notes = {
    notes: [],
    completed: [],
    pending: [],
}   

/* Reducer Actions to the Authentication State */
export const NotesReducer = (state, action) => {
    switch(action.type){
        case 'init':
            return {
                notes: []
            }        
        case types.myNotes:
            return {
                notes: action.payload,
                completed: action.payload.filter((post) => post.completed === true),
                pending: action.payload.filter((post) => post.completed === false)
            }
        case types.updateNotes:
            return {
                notes: action.payload,
                completed: action.payload.filter((post) => post.completed === true),
                pending: action.payload.filter((post) => post.completed === false)
            }
        default:
            return state
    }
}

/* Reducer Authentication Action Types */
export const types = {
    myNotes: 'get-notes',
    addNote: 'add-note',
    updateNote: 'update-note',
    deleteNote: 'delete-note',
    editNote: 'edit-note',
    completed: 'completed'
}
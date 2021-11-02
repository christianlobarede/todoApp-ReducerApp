import React, { createContext, useReducer } from 'react'    
import { Notes, NotesReducer } from './notes.reducer';

export const NotesContext = createContext();

export const NotesProvider = ({children}) => {
    const [NotesState, NotesDispatch] = useReducer(NotesReducer, Notes);

    return (
        <NotesContext.Provider value={[NotesState, NotesDispatch]}>
            {children}
        </NotesContext.Provider>
    )
}

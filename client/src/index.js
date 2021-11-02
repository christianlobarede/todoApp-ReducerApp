import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './app-context/auth-provider';
import { NotesProvider } from './app-context/notes-provider';

ReactDOM.render(
  <React.StrictMode>

    <AuthProvider>
      <NotesProvider>

        <App />
        
      </NotesProvider>
    </AuthProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);



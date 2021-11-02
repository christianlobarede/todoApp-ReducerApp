import './home2.css'
import { useContext } from 'react'
import {AuthContext} from '../app-context/auth-provider'
import { types } from '../app-context/auth-reducer'
import {  useHistory } from 'react-router-dom'
import { NotesContext } from '../app-context/notes-provider'
import { Sidebar } from './Sidebar'


export const Home2 = () => {
    const history = useHistory();
    const [state, dispatch] = useContext(AuthContext)
    console.log(state)
    const [NotesState, NotesDispatch] = useContext(NotesContext)
    console.log(NotesState)


    const handleLogout = () => {
        dispatch({
            type: types.authLogout,
        })
        NotesDispatch({
            type: 'init'
        })
        setTimeout(() => {
            history.push("/")
        }, 1000)
    }
    const handleSideMenu = () => {
        document.querySelector('.sidebar').classList.toggle('active')
    }
    
    return(
        <>
        <div className="nav-container">
            <span className="burger-menu" onClick={handleSideMenu}>
                <svg viewBox="0 0 100 80" width="20" height="20" style={{fill: '#fff'}}>
                    <rect width="100" height="12"></rect>
                    <rect y="30" width="100" height="12"></rect>
                    <rect y="60" width="100" height="12"></rect>
                </svg>
            </span>
            <h2>{' Bienvenido a tu Lista de Tareas '}</h2>
            <button onClick={handleLogout} className="btn btn-light logout">Logout</button>
        </div>
            <Sidebar/>
        </>
    )
}
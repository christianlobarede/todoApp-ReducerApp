import '../styles/list.css'
import React, { useContext, useEffect, useRef, useState } from "react"
import { NotesContext } from "../app-context/notes-provider"
import { Link } from 'react-router-dom'
import { AuthContext } from "../app-context/auth-provider"
import { CompletedNote } from '../services/notes/notes-completed'
import { DeletedNote } from '../services/notes/notes-delete'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export const MyList = () => {
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('');
    const [alertText, setAlertText] = useState('');
    const [state] = useContext(AuthContext)
    const [NotesState, NotesDispatch] = useContext(NotesContext)
    const {completed, pending} = NotesState;
    const [list, setList] = useState(pending)
    const [completedList, setCompletedList ] = useState(completed)
    const [dragging, setDragging] = useState(false)
    const dragItem = useRef();
    const dragNode = useRef();

    useEffect(() => {
        setList(pending)
        setCompletedList(completed)
    }, [completed, pending])

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };

      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    

    const handleDragStart = (e, params) => {
        //console.log('Start dragging..', params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if(e.target !== dragNode.current){
            //console.log("Target is not same", params.itemI, currentItem.itemI)
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList.splice(params.itemI, 0 , newList.splice(currentItem.itemI, 1)[0])
                dragItem.current = params;
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        //console.log("Ending drag")
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleCompleted = async(id) => {
        const results = await CompletedNote(id, state.id)
        NotesDispatch({type: 'get-notes', payload: results})
        setSeverity('success');
        setAlertText(`Lista modificada correctamente`)
        setOpen(true);
    }

    const handleDelete = async(id) => {
        const results = await DeletedNote(id, state.id)
        NotesDispatch({type: 'get-notes', payload: results})
        setSeverity('success');
        setAlertText(`Tarea eliminada correctamente`)
        setOpen(true);
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current
        if(currentItem.itemI === params.itemI){
            return 'current list-item'
        }
        return 'list-item'
    }

    return(
        <>
        <div className="list-container">
            <div className="list-header"> 
                <h2>Tu Lista de Tareas Pendiente</h2>
            </div>
            <div className="list-body">
            {list ? list.map((x, itemI) => {
                return (
                <div 
                key={itemI} 
                draggable 
                onDragStart={(e) => handleDragStart(e, {itemI})}
                onDragEnter={dragging ? (e)=> {  handleDragEnter(e, {itemI}) }: null}  
                className={dragging ? getStyles({itemI}) : "list-item"}>
                    <div className="list-text">{x.title}</div>
                    <div className="list-text">{x.content}</div>
                    <div className="list-text date">{x.date}</div>
                    <div className="list-text"><Link to={`/home/edit/${x._id}`}  ><button  className="btn btn-primary">Editar</button></Link></div>
                    <div className="list-text"><button onClick={() => handleDelete(x._id)} className="btn btn-danger">Eliminar</button></div>
                    <div className="list-text"><button onClick={() => handleCompleted(x._id)} className="btn btn-success">Completada</button></div>
                </div>)}) : ''}
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} >
                  {alertText}
                </Alert>
            </Snackbar>

            <div className="list-header"> 
                <h2>Tu Lista de Tareas Completadas</h2>
            </div>
            <div className="list-body">
            {completedList ? completedList.map((x, itemI) => {
                return (
                <div key={itemI} className="list-item completed">
                    <div className="list-text">{x.title}</div>
                    <div className="list-text">{x.content}</div>
                    <div className="list-text date">{x.date}</div>
                    <div className="list-text"><button onClick={() => handleDelete(x._id)} className="btn btn-warning text-white">Limpiar</button></div>
                </div>)}) : ''}
            </div>
        </div>
        </>
    )
}
import React from 'react'
import "../styles/login.css"
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useContext, useState } from "react"
import { PostService } from "../services/notes/notes-newpost"
import { AuthContext } from "../app-context/auth-provider"
import { NotesContext } from "../app-context/notes-provider"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const NewPost = () => {
  const [state, ] = useContext(AuthContext)
  const [, NotesDispatch] = useContext(NotesContext)
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState('');
  const [alertText, setAlertText] = useState('');
  const [post, setPost] = useState({
    title: '',
    content: '',
  })

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const result = await PostService(post, state.id)
      NotesDispatch({type: 'get-notes', payload: result})
      setPost({title: '', content: ''})
      setSeverity('success');
      setAlertText(`Tarea ingresada exitosamente`)
      setOpen(true);
    } catch(e){
      setSeverity('error');
      setAlertText('Ups tenemos un error')
      setOpen(true);
    }
  }
    return(
        <>
        <div className="form-section">
            <div className="form">
            <div className="form-header">
                <h2>Publica una nueva Tarea</h2>
            </div>
            <Container maxWidth="xs">  
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      placeholder="Ingresa el titulo del Post"
                      name="title"
                      color="secondary"
                      fullWidth
                      value={post.title}
                      onChange={handleChange}
                      required
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      placeholder="Ingresa una descripcion"
                      name="content"
                      color="secondary"
                      fullWidth
                      onChange={handleChange}
                      required
                      value={post.content}
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={handleSubmit}>
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} >
                      {alertText}
                    </Alert>
                </Snackbar>
            </Container>
            </div>
        </div>
        </>
    )
}
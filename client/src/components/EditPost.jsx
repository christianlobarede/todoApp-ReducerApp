import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import axios from 'axios'
import { UpdateNote } from "../services/notes/notes-update"
import {AuthContext} from "../app-context/auth-provider"
import {NotesContext} from '../app-context/notes-provider'


export const EditPost = () => {
  const [state,] = useContext(AuthContext)
  const [, NotesDispatch] = useContext(NotesContext)
  const { id } = useParams();

  const [post, setPost] = useState({
    title: '',
    content: ''
  })


  useEffect(() => {
    const fetchData = async() => {
      const {data} = await axios.get(`http://localhost:5000/api/posts/${id}`)
      setPost({
        title: data.title,
        content: data.content
      })
    }
    fetchData();
  }, [id])  


    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const result = await UpdateNote(post, id, state.id)
        setPost({title: '', content: ''})
        NotesDispatch({type: 'get-notes', payload: result})
    } 


    return(
        <>
        <div className="form-section">
            <div className="form">
            <div className="form-header">
                <h2>Edita esta tarea</h2>
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
                      value={post.content}
                      onChange={handleChange}
                      required
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={handleSubmit}>
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
            </Container>
            </div>
        </div>
        </>
    )
}
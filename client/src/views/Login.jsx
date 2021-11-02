import React from 'react'
import { useState, useContext } from 'react'
import "../styles/login.css"
import { LoginService } from '../services/auth/auth-login'
import { NotesService } from '../services/notes/notes-getByUser'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../app-context/auth-provider'
import { types } from '../app-context/auth-reducer'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { NotesContext } from '../app-context/notes-provider'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



export const Login = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('');
    const [alertText, setAlertText] = useState('');
    const [, dispatch] = useContext(AuthContext)
    const [, NotesDispatch] = useContext(NotesContext)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
          //Use the Login Service to get the personal info of the user
          const result = await LoginService(credentials)
          //Update the State with user's information
          dispatch({
            type: types.authLogin,
            payload: {token: result.token, id: result.user._id, user: result.user}
          })
          
          setSeverity('success');
          setAlertText(`Bienvenido ${result.user.username}`)
          setOpen(true);
          
          //Get the User and get the info for this user//
          const mylist = await NotesService(result.user._id)
          
          //Update the state with user's posts
          NotesDispatch({type: 'get-notes', payload: mylist})
          
          //Clean up credentials
          setCredentials({email: '', password: ''})
          
          //Navigate to Dashboard
          history.push("/home")
        } catch(e) {
          setSeverity('error');
          setAlertText('Usuario o contraseña inválida')
          setOpen(true);
        }
      }
        
    return (
        <>
        <div className="form-section">
            <div className="form">
            <div className="form-header">
                <h2>Accede a tu cuenta</h2>
            </div>
            <Container maxWidth="xs">  
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      placeholder="Ingresa tu email"
                      name="email"
                      color="secondary"
                      fullWidth
                      value={credentials.email}
                      onChange={handleChange}
                      required
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      placeholder="Ingresa tu password"
                      name="password"
                      color="secondary"
                      fullWidth
                      onChange={handleChange}
                      required
                      value={credentials.password}
                      margin="normal"
                      type="password"
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={handleLogin}>
                      Inicia Sesion
                    </Button>
                  </Grid>
                    <span className="m-3 text-dark">
                      ¿ Aun no tienes una cuenta ? <Link className="text-dark" to="/signup"> Ingresa aqui para registrarte</Link>
                    </span>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
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

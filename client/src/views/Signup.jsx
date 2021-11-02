import { useState } from "react"
import { useHistory } from "react-router"
import { SignupService } from '../services/auth/auth-signup'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'



export const Signup = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSignup = async(e) => {
        e.preventDefault();
        await SignupService(credentials)
        setCredentials({username: '', email: '', password: ''})
        history.push("/")
    }


    return (
        <>
        <div className="form-section">
            <div className="form">
            <div className="form-header">
                <h2>Registro de Usuario</h2>
            </div>
            <Container maxWidth="xs">  
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      placeholder="Ingresa tu nombre de usuario"
                      name="username"
                      color="secondary"
                      fullWidth
                      value={credentials.username}
                      onChange={handleChange}
                      required
                      margin="normal"
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      placeholder="Ingresa tu email"
                      name="email"
                      color="secondary"
                      fullWidth
                      onChange={handleChange}
                      required
                      value={credentials.email}
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
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={handleSignup}>
                      Signup
                    </Button>
                  </Grid>
                </Grid>
            </Container>
            </div>
        </div>
        </>
    )}
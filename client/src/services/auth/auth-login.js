import axios from 'axios';
const url = 'http://localhost:5000/api/users/login';


export const LoginService = async(credentials) => {
    const {email, password} = credentials;
    const {data} = await axios.post(url, {
        email,
        password
    })
    return data
}

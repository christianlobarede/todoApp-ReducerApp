import axios from 'axios';
const url = 'http://localhost:5000/api/users/signup';


export const SignupService = async(credentials) => {
    const {username, email, password} = credentials;
    const {data} = await axios.post(url, {
        username,
        email,
        password
    })
    return data
}

import axios from 'axios';


export const NotesService = async(id) => {
    const {data} = await axios.get('http://localhost:5000/api/users/posts/'+id)
    return data
}
import axios from 'axios';


export const DeletedNote = async(postId, userId) => {

    await axios.delete(`http://localhost:5000/api/posts/${postId}`)

    const {data} = await axios.get('http://localhost:5000/api/users/posts/'+userId)
    return data
}
import axios from 'axios';


export const CompletedNote = async(postId, userId) => {

    await axios.post(`http://localhost:5000/api/posts/${postId}`,{
        completed: 'true'
    })

    const {data} = await axios.get('http://localhost:5000/api/users/posts/'+userId)
    return data
}
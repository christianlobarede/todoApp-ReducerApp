import axios from 'axios'


export const UpdateNote = async(post, postId, userId) => {
    const {title, content} = post;

    await axios.post(`http://localhost:5000/api/posts/${postId}`,
    {
        title,
        content
    })
    const {data} = await axios.get('http://localhost:5000/api/users/posts/'+userId)
    return data
}
import axios from 'axios';


export const PostService = async(post, id) => {
    const {title, content} = post;
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/posts',
    {
        title,
        content
    },
    {
        headers: {
            Authorization: 'Bearer '+ token
        }
    })
    const {data} = await axios.get('http://localhost:5000/api/users/posts/'+id)
    return data
}
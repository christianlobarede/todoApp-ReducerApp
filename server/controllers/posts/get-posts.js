const {Post} = require('../../models/posts/posts.model')

const GetAllPosts = async(req, res) => {
    try{
        const AllNotes = await Post.find().populate('users', {_id: 1, username: 1})
        res.status(200).send(AllNotes)
    } catch(e){
        res.status(500).send(e)
    }
}

module.exports = GetAllPosts
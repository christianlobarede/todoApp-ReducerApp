const { Post } = require('../../models/posts/posts.model')
const { User } = require('../../models/users/user.model')

const GetPostByUser = async(req, res) => {
    try{
        const {userId} = req.params;
        const user = await User.findById({_id: userId}).populate('posts', {title: 1, content: 1, completed: 1, date: 1, _id: 1})
        const Posts = user.posts
        res.status(200).send(Posts)
    } catch(e){
        res.status(500).send(e)
    }
}

module.exports = GetPostByUser;
const { Post } = require('../../models/posts/posts.model')
const { User } = require('../../models/users/user.model')

const NewPostController = async (req, res) => {
    try {        
        const NewNote = await Post.create({...req.body, users: req.user._id})
        
        const user = await User.findById({_id: req.user._id});
        
        user.posts = user.posts.concat(NewNote._id)
        
        await user.save()
        
        res.status(200).send(NewNote)
    } catch(e){
        res.status(500).send(e)
    }
        
}

module.exports = NewPostController;
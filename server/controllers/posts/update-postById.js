const { Post } = require('../../models/posts/posts.model')


const UpdateById = async(req, res) => {
    const {id} = req.params;
    try {

        const doc = await Post.findByIdAndUpdate(id, {...req.body})
        const newDoc = await Post.findById(id)
        res.status(200).send(newDoc)
    } catch(e){
        res.status(500).send(e)
    }
}
module.exports = UpdateById
const { Post } = require('../../models/posts/posts.model')

const FindById = async(req, res) => {
    const {id} = req.params;
    try {
        const doc = await Post.findById(id)
        res.status(200).send(doc)
    } catch(e){
        res.status(500).send(e)
    }
}

module.exports = FindById
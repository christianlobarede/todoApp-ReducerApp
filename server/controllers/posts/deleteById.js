const { Post } = require('../../models/posts/posts.model')


const DeleteById = async(req, res) => {
    const {id} = req.params;
    try {
        const doc = await Post.findByIdAndRemove(id)
        res.status(200).send("Documento eliminado exitosamente")
    } catch(e) {
        res.status(500).send(e)
    }
}
module.exports = DeleteById;
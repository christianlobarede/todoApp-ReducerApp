const { User } = require("../../models/users/user.model")

const AllUsers = async(req, res) => {
    try {
        const doc = await User.find();
        res.status(200).json(doc)
    } catch(e){
        res.status(500).json({message: "Not Found"})
    }
};

module.exports = AllUsers;
const { User } = require('../../models/users/user.model')
const bcrypt = require("bcrypt");


const SignUpController = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const doc = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        res.status(201).json({newUser: doc})
    } catch (e) {
        res.status(500).json({message: 'Error de Registro'})
    }
}

module.exports = SignUpController;
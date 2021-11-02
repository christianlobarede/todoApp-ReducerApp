const jwt = require("jsonwebtoken")

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        console.log("No valid token")
        return res.sendStatus(401)
    } 

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)

    req.user = decodedToken
    
    next()
}

module.exports = verifyToken
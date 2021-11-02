const verifyToken = require('../../midleware/verifyToken')

module.exports = function (app){
    app.get("/api", (req, res) => { res.json("Api activada")})
    app.post("/api/users/signup", require("../../controllers/users/signup-controller"))
    app.post("/api/users/login", require("../../controllers/users/login-controller"))
    app.get("/api/users/get", require("../../controllers/users/all-users"))
    app.post("/api/posts", verifyToken, require('../../controllers/posts/new-post'))
    app.post("/api/posts/:id", require('../../controllers/posts/update-postById'))
    app.get("/api/posts/:id", require('../../controllers/posts/findById'))
    app.delete("/api/posts/:id", require('../../controllers/posts/deleteById'))
    app.get("/api/posts", require("../../controllers/posts/get-posts"))
    app.get("/api/users/posts/:userId", require("../../controllers/posts/get-posts-byUser"))
}
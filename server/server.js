const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("../server/api/routes/api")(app);
require("../server/config/configDB")();

app.listen(5000, () => {
    console.log("1/2 Listening on port", 5000)
})
require("dotenv").config();
const mongoose = require("mongoose");

const mongooseConfig = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, //make this also true
    });
    console.log("2/2 Conectado a Mongo");
  } catch (err) {
    console.error("Hubo un error ahorita mismo");
    process.exit(1);
  }
};

module.exports = mongooseConfig;
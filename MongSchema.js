const mongoose = require("mongoose")
const url = "mongodb+srv://user:user@cluster0.hgk4u38.mongodb.net/?retryWrites=true&w=majority";
const Schema = mongoose.Schema

const Response = new Schema({
    welcome_txt: {
        type: String
    },
    name: {
        type: String
    },
    paragraph: {
        type: String
    },
    country: {
        type: String
    },
    description: {
        type: String
    }
})

const ResponseModel = mongoose.model("DBData", Response)

module.exports.ResponseModel=ResponseModel;
module.exports.url=url;



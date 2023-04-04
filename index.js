const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// configuring mongoose
const mongoose = require("mongoose")
const { ResponseModel } = require("./MongSchema")
const { url } = require("./MongSchema");

//post the updated data in database

app.post("/myzer", (async (req, res) => {
    try {
        await mongoose.connect(url)
        let updateData = req.body;
        await ResponseModel.updateMany(
            { "_id": "642c00e71a174dbaf285d000" },
            { $set: updateData })
        res.send(updateData)
    }
    catch (error) {
        console.log(error);
    }
}))

//get data on the UI 

app.get("/", (async (req, res) => {
    try {
        await mongoose.connect(url)
        const stringData = await ResponseModel.find({ "_id": "642c00e71a174dbaf285d000" })

        var data = `<h1>welcome_txt : ${stringData[0].welcome_txt}</h1><br> 
        <h1>name : ${stringData[0].name}</h1><br>
        <h1>paragraph : ${stringData[0].paragraph}</h1><br>
        <h1>country : ${stringData[0].country}</h1><br>
        <h1>description : ${stringData[0].description}</h1><br>`
        res.send(data)   
    }
    catch (error) {
        console.log(error);
    } 
}))

app.listen(process.env.PORT || 4000)
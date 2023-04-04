const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb+srv://user:user@nex-chatgpt.dzatrnh.mongodb.net/myzer?retryWrites=true&w=majority";

const responseSchema = new mongoose.Schema({
    welcome_txt: String,
    name: String,
    paragraph: String,
    country: String,
    description: String
});

const ResponseModel = mongoose.model("Response", responseSchema);

// Post the updated data in database
app.post("/myzer", async (req, res) => {
    try {
        await mongoose.connect(url);
        const updateData = req.body;
        await ResponseModel.updateMany({ "_id": "642c596c5a274a327d82bc88" }, { $set: updateData });
        res.send(updateData);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get data on the UI
app.get("/", async (req, res) => {
    try {
        await mongoose.connect(url);
        const stringData = await ResponseModel.find({ "_id": "642c596c5a274a327d82bc88" }).lean();
        const data = `<h1>welcome_txt : ${stringData[0].welcome_txt}</h1><br> 
                      <h1>name : ${stringData[0].name}</h1><br>
                      <h1>paragraph : ${stringData[0].paragraph}</h1><br>
                      <h1>country : ${stringData[0].country}</h1><br>
                      <h1>description : ${stringData[0].description}</h1><br>`;
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000...");
});

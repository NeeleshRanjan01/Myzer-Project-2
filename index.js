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

// connect to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.log('Error connecting to database:', error)
  })

// post the updated data in database
app.post("/myzer", async (req, res) => {
  try {
    let updateData = req.body;
    const result = await ResponseModel.updateMany(
      { "_id": "642c00e71a174dbaf285d000" },
      { $set: updateData })
    if (result.nModified > 0) {
      res.send(updateData)
    } else {
      res.status(404).send('No document found')
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")
  }
})

// get data on the UI
app.get("/", async (req, res) => {
  try {
    const stringData = await ResponseModel.find({ "_id": "642c00e71a174dbaf285d000" })
    if (stringData.length > 0) {
      var data = `<h1>welcome_txt : ${stringData[0].welcome_txt}</h1><br> 
          <h1>name : ${stringData[0].name}</h1><br>
          <h1>paragraph : ${stringData[0].paragraph}</h1><br>
          <h1>country : ${stringData[0].country}</h1><br>
          <h1>description : ${stringData[0].description}</h1><br>`
      res.send(data)
    } else {
      res.status(404).send('No document found')
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")
  }
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port 4000')
})

const express = require("express");

const mongoose = require("mongoose");
var cors = require('cors');
const articleRoute= require('./routes/articleRoute')


require("dotenv").config();

const app = express();
app.use(cors());
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("database connected");
    app.listen(process.env.PORT || 80, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use('/uploads', express.static('uploads'))

app.use(express.json());

app.use('/',articleRoute)

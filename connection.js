const mongoose = require("mongoose");

// 👉 PASTE YOUR MONGODB CONNECTION STRING INSIDE connect()
mongoose
  .connect(
    "mongodb+srv://zainabnizar413_db_user:zainaa@cluster0.wfqlsdd.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
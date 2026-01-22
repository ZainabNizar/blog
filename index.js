const express = require("express");
const cors = require("cors");

// 🔹 DB connection
require("./connection");

// 🔹 Blog model
const BlogModel = require("./model");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

/* ================= POST API – ADD BLOG ================= */
app.post("/add", async (req, res) => {
  try {
    const data = await BlogModel(req.body);
    await data.save();
    res.send({ message: "Blog added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding blog");
  }
});

/* ================= GET API – FETCH BLOGS ================= */
app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching blogs");
  }
});

/* ================= DELETE API ================= */
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Blog deleted" });
  } catch (error) {
    console.log(error);
  }
});

/* ================= UPDATE API ================= */
app.put("/update/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Blog updated" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
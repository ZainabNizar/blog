import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If coming from update, prefill inputs
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (location.state) {
      setInputs({
        title: location.state.title || "",
        content: location.state.content || "",
        img_url: location.state.img_url || "",
        _id: location.state._id, // needed for update
      });
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Add or Update based on presence of _id
  const handleSubmit = () => {
    if (inputs._id) {
      // Update existing blog
      axios
        .put(`http://localhost:3001/update/${inputs._id}`, inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      // Add new blog
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Title"
          onChange={inputHandler}
          name="title"
          value={inputs.title}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          placeholder="Content"
          onChange={inputHandler}
          name="content"
          value={inputs.content}
          multiline
          rows={4}
          required
        />
        <TextField
          variant="outlined"
          placeholder="Image URL"
          onChange={inputHandler}
          name="img_url"
          value={inputs.img_url}
          required
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={
            !inputs.title.trim() ||
            !inputs.content.trim() ||
            !inputs.img_url.trim()
          }
        >
          {inputs._id ? "Update" : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
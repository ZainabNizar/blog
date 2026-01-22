import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Delete blog
  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Update blog
  const updateBlog = (blog) => {
    navigate("/add", { state: blog });
  };

  return (
    <Grid container spacing={3} padding={3}>
      {blogs.map((blog) => (
        <Grid item xs={12} sm={6} md={4} key={blog._id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={blog.img_url}
              alt={blog.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Blog
              </Typography>
              <Typography variant="h6">{blog.title}</Typography>

              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ mr: 1, mt: 1 }}
                onClick={() => deleteBlog(blog._id)}
              >
                DELETE
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => updateBlog(blog)}
              >
                UPDATE
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
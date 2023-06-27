import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddBlogButton from "../Blog/AddBlogButton";
import axios from "axios";
import { setSelectedBlog } from "../Feature/LoginSlice";
import Navbar from "../Home/Navbar";

const MyBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const { email } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://localhost:14648/api/Blog/MyBlogs?email=${encodeURIComponent(
      email
    )}`;

    axios.get(apiUrl).then((response) => {
      setBlogPosts(response.data);
    });
  }, [email]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleEdit = (blog) => {
    dispatch(setSelectedBlog(blog));
    navigate("/addBlog");
  };

  const handleDelete = async (id) => {
    try {
      const apiUrl = `http://localhost:14648/api/Blog/DeleteBlog?id=${id}`;
      await axios.delete(apiUrl);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete blog.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-5">
        {email != null && <AddBlogButton />}
        <h2 className="m-3">Latest Blog Posts</h2>
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-post">
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-date">
                Posted by <strong>{post.userName}</strong> on{" "}
                <strong>{formatDate(post.date)}</strong>
              </p>
            </div>
            <div className="post-content">
              <img
                src={`http://localhost:14648/images/${post.imagePath}`}
                alt="Blog Post"
                className="logo-image"
                height={80}
              />
              <p className="post-description">{post.description}</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(post)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger mx-2"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBlog;

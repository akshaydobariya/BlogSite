import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddBlogButton from "../Blog/AddBlogButton";
import axios from "axios";
import Navbar from "./Navbar";

const MyBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:14648/api/Blog/AllBlogs").then((response) => {
      setBlogPosts(response.data);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const { email } = useSelector((state) => state.login);

  return (
    <>
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
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBlog;

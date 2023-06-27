import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddBlogButton from "../Blog/AddBlogButton";
import axios from "axios";

const MyBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const { email } = useSelector((state) => state.login);

  useEffect(() => {
    const apiUrl = `http://localhost:14648/api/Blog/MyBlogs?email=${encodeURIComponent(
      email
    )}`;

    axios.get(apiUrl).then((response) => {
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

  return (
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
            />
            <p className="post-description">{post.description}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyBlog;

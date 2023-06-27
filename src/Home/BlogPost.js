import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddBlogButton from "../Blog/AddBlogButton";
import axios from "axios";

const Blog = () => {
  const [blogPosts, setblogPosts] = useState();
  useEffect(() => {
    axios.get("http://localhost:14648/api/Blog/AllBlogs").then((blog) => {
      setblogPosts(blog.data);
    });
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  console.log(blogPosts);
  const { email } = useSelector((state) => state.login);
  return (
    <div className="p-5">
      {email != null && <AddBlogButton />}
      <h2 className="m-3">Latest Blog Posts</h2>
      {blogPosts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <img
            src={`http://localhost:14648/images/${post.imagePath}`}
            alt="..."
          />
          <p>
            Posted b<strong> {post.userName} </strong>on{" "}
            <strong>{formatDate(post.date)}</strong>
          </p>
          <p>{post.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Blog;

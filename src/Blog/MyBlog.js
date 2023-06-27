import React, { useEffect, useState } from "react";
import AddBlogButton from "./AddBlogButton";
import axios from "axios";
import { useSelector } from "react-redux";

const MyBlog = () => {
  const [blogPosts, setblogPosts] = useState();
  useEffect(() => {
    axios.get("http://localhost:14648/api/Blog/AllBlogs").then((response) => {
      setblogPosts(response.data);
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
    <div className="p-5">
      {email != null && <AddBlogButton />}
      <h2 className="m-3">Latest Blog Posts</h2>
      {blogPosts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>

          <p>
            Posted by <strong>{post.userName}</strong> on{" "}
            <strong>{formatDate(post.date)}</strong>
          </p>
          <p>{post.description}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyBlog;

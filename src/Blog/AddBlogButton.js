import React from "react";
import { Link } from "react-router-dom";

const AddBlogButton = () => {
  return (
    <Link to={"/addBlog"} className="btn btn-primary">
      AddBlog
    </Link>
  );
};

export default AddBlogButton;

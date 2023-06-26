import axios from "axios";
import { useFormik } from "formik";
import React from "react";

const AddBlog = () => {
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      userName: "",
      date: "",
      category: "",
      description: "", // Corrected name attribute here
    },
    onSubmit: (values) => {
      console.log(values);
      const url = "http://localhost:14648/api/Blog/AddBlogs";
      const Data = values;
      axios.post(url, Data).then((response) => {
        if (response) {
          alert("Blog Added Successfully");
        }
      });
    },
  });

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100 bg-light-subtle">
      <div className="w-25 p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-danger text-center text-capitalize">Add Blog</h3>
          <div className="my-3">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              name="userName"
              className="form-control"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Category-1">Category-1</option>
              <option value="Category-2">Category-2</option>
              <option value="Category-3">Category-3</option>
              <option value="Category-4">Category-4</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              name="description" // Corrected name attribute here
              value={values.description}
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Home/Navbar";
import { clearSelectedBlog } from "../Feature/LoginSlice";

const AddBlog = () => {
  const { email, selectedBlog } = useSelector((state) => state.login);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const { values, handleChange, handleBlur, handleSubmit, setValues } =
    useFormik({
      initialValues: {
        Id: "",
        title: "",
        userName: "",
        date: "",
        category: "",
        description: "",
        email: email,
      },
      onSubmit: (values, action) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("userName", values.userName);
        formData.append("date", values.date);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("email", values.email);
        formData.append("image", selectedFile);

        if (selectedBlog != null) {
          formData.append("Id", values.Id);
          axios
            .post("http://localhost:14648/api/Blog/UpdateBlog", formData)
            .then((response) => {
              console.log(response.data);
              alert("Blog Update Successfully");
              dispatch(clearSelectedBlog());
              action.resetForm();
            })
            .catch((error) => {
              console.error(error);
              alert("Failed to update blog.");
            });
        } else {
          axios
            .post("http://localhost:14648/api/Blog/AddBlogs", formData)
            .then((response) => {
              console.log(response.data);
              alert("Blog Added Successfully");
              action.resetForm();
            })
            .catch((error) => {
              console.error(error);
              alert("Failed to add blog.");
            });
        }
      },
    });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedBlog) {
      // Set the form field values with the selected blog data
      setValues({
        Id: selectedBlog.id,
        title: selectedBlog.title,
        userName: selectedBlog.userName,
        date: selectedBlog.date,
        category: selectedBlog.category,
        description: selectedBlog.description,
        email: selectedBlog.email,
      });
    }
  }, [selectedBlog, setValues]);

  return (
    <>
      <Navbar />
      <div className="login d-flex justify-content-center align-items-center vh-100 bg-light-subtle">
        <div className="w-25 p-5 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h3 className="text-danger text-center text-capitalize">
              {selectedBlog ? "Edit Blog" : "Add Blog"}
            </h3>
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
                name="description"
                value={values.description}
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {selectedBlog ? "Update" : "Add Blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;

import React from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nevigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
    onSubmit: (values, action) => {
      console.log(values);
      const url = "http://localhost:14648/api/Register/AddUers";
      const data = values;
      axios
        .post(url, data)
        .then((response) => {
          if (response) {
            nevigate("/login");
          } else {
            alert("User already exists");
          }
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });

      action.resetForm();
    },
  });
  return (
    <div className="login d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="w-25 p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-2">
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter firstName"
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter lastName"
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="form-control"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              required
            />
          </div>
          <div className="mb-2">
            <input type="submit" value="Submit" className="btn btn-success" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Feature/LoginSlice";

const Login = () => {
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values, action) => {
      const url = "http://localhost:14648/api/Register/Login";
      const Data = values;
      axios.post(url, Data).then((response) => {
        if (response) {
          dispatch(login(values.email));
          nevigate("/");
        } else {
          alert("Enter a velid Email Password");
        }
      });
    },
  });

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="w-25 p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Sign In</legend>

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
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;

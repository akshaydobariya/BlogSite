import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Feature/LoginSlice";

const Navbar = () => {
  const { email } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  console.log(email);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* <a className="navbar-brand me-2" href="https://mdbgo.com/">
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            height="16"
            alt="MDB Logo"
            loading="lazy"
            style={{ marginTop: "-1px" }}
          />
        </a> */}
        {/* 
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">sdc</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">wd</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">d</a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {email == null && (
              <>
                <Link to="/login" className="btn btn-link px-3 me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary me-3">
                  Sign up for free
                </Link>
              </>
            )}
            {email != null && (
              <Link
                to="/"
                className="btn btn-link px-3 me-2"
                onClick={() => dispatch(logout())}
              >
                logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a role="button" className="navbar-brand" onClick={()=>navigate("/")}>
            BlogApp
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" role="button" onClick={()=>navigate("/")}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" role="button" onClick={()=>navigate("/create")}>
                  Create
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Made by Manank Patel</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;

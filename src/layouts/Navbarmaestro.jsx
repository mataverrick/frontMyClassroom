import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbarmaestro = ({ children, actionComponent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/maestro/home">
            Classroom
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/maestro/home"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logout} href="/">
                  Logout
                </a>
              </li>
            </ul>
            <div className="d-flex">{actionComponent}</div>
          </div>
        </div>
      </nav>
      <div className="container mt-4">{children}</div>
    </div>
  );
};

export default Navbarmaestro;

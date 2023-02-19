import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid text-white">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          className="navbar-brand text-light"
        >
          Sigma Project
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span
                onClick={() => navigate("user")}
                className="nav-link active text-light"
                aria-current="page"
                style={{ cursor: "pointer" }}
              >
                Usuarios
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

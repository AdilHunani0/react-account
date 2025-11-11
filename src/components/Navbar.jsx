import { Link, NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../auth";

export default function Navbar() {
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid px-4">
        {/* 🔹 Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          AccountMgr
        </Link>

        {/* 🔹 Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Collapsible Links Section */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center gap-lg-3">
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    end
                    className={({ isActive }) =>
                      "nav-link px-2" + (isActive ? " active fw-semibold" : "")
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    end
                    className={({ isActive }) =>
                      "nav-link px-2" + (isActive ? " active fw-semibold" : "")
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/account"
                    end
                    className={({ isActive }) =>
                      "nav-link px-2" + (isActive ? " active fw-semibold" : "")
                    }
                  >
                    My Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-lg-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

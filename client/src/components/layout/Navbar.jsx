import { NavLink } from "react-router-dom";

import { useAuth } from "../auth/AuthContext.jsx";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Keep navbar usable even if logout request fails.
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <NavLink className={styles.brand} to="/">
          SideQuest
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/projects">Browse Projects</NavLink>
          <NavLink to="/projects/new">Create Project</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>

          {!isLoading && isAuthenticated ? (
            <>
              <NavLink to={`/profile/${user._id}`}>My Profile</NavLink>
              <button
                className={styles.logoutButton}
                onClick={handleLogout}
                type="button"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/register">Sign Up</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

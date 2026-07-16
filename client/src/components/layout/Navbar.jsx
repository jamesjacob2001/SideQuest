import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
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
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
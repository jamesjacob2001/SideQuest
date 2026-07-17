import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <section className={styles.page}>
      <p className={styles.brand}>SideQuest</p>
      <h1 className={styles.headline}>Build something worth sharing.</h1>
      <p className={styles.introduction}>
        Discover side projects, find collaborators across any field, and form
        teams around ideas that matter to you.
      </p>
      <div className={styles.actions}>
        <Link className={styles.primaryLink} to="/projects">
          Browse projects
        </Link>
        <Link className={styles.secondaryLink} to="/register">
          Create an account
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;

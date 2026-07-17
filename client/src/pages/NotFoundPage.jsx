import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <h1>Page not found</h1>
      <p>That route does not exist in SideQuest.</p>
      <Link className={styles.link} to="/projects">
        Browse projects
      </Link>
    </section>
  );
}

export default NotFoundPage;

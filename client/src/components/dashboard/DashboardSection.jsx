import PropTypes from "prop-types";

import styles from "./DashboardSection.module.css";

function DashboardSection({ title, description, children, emptyMessage, isEmpty }) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </header>

      {isEmpty ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        children
      )}
    </section>
  );
}

DashboardSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  emptyMessage: PropTypes.string,
  isEmpty: PropTypes.bool,
};

export default DashboardSection;

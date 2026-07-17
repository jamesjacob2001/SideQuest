import PropTypes from "prop-types";

import styles from "./ProjectPagination.module.css";

function ProjectPagination({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Project pages">
      <button
        className={styles.button}
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        Previous
      </button>

      <p className={styles.pageStatus}>
        Page {page} of {totalPages}
      </p>

      <button
        className={styles.button}
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </nav>
  );
}

ProjectPagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ProjectPagination;

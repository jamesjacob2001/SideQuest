import PropTypes from "prop-types";
import { memo, useCallback } from "react";

import styles from "./ProjectPagination.module.css";

function ProjectPagination({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}) {
  const handlePreviousClick = useCallback(() => {
    onPageChange(page - 1);
  }, [page, onPageChange]);

  const handleNextClick = useCallback(() => {
    onPageChange(page + 1);
  }, [page, onPageChange]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Project pages">
      <button
        className={styles.button}
        type="button"
        onClick={handlePreviousClick}
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
        onClick={handleNextClick}
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

export default memo(ProjectPagination);

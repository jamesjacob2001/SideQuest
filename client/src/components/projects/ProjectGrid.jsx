import PropTypes from "prop-types";
import { memo } from "react";

import ProjectCard from "./ProjectCard.jsx";
import styles from "./ProjectGrid.module.css";

function ProjectGrid({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}

ProjectGrid.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(ProjectGrid);

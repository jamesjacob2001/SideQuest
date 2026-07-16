import PropTypes from "prop-types";

import styles from "./ProjectRoleCard.module.css";

function ProjectRoleCard({ role }) {
  const {
    title,
    description,
    requiredSkills = [],
    experienceLevel,
    totalPositions,
  } = role;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>{title}</h3>

          {experienceLevel && (
            <p className={styles.experience}>{experienceLevel}</p>
          )}
        </div>

        <span className={styles.positions}>
          {totalPositions}{" "}
          {totalPositions === 1 ? "position" : "positions"}
        </span>
      </div>

      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {requiredSkills.length > 0 && (
        <div className={styles.skillsSection}>
          <h4>Required skills</h4>

          <div className={styles.skillList}>
            {requiredSkills.map((skill) => (
              <span className={styles.skill} key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

ProjectRoleCard.propTypes = {
  role: PropTypes.shape({
    roleId: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    requiredSkills: PropTypes.arrayOf(PropTypes.string),
    experienceLevel: PropTypes.string,
    totalPositions: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProjectRoleCard;
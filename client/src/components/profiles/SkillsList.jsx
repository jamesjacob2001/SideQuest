import PropTypes from "prop-types";

import styles from "./SkillsList.module.css";

function SkillsList({ skills }) {
  if (!skills?.length) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 className={styles.heading} id="skills-heading">
        Technical skills
      </h2>

      <ul className={styles.list}>
        {skills.map((skill) => (
          <li className={styles.tag} key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

SkillsList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
};

export default SkillsList;

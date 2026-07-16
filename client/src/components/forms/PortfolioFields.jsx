import PropTypes from "prop-types";

import styles from "./ProfileForm.module.css";

function PortfolioFields({ values, onChange }) {
  function updateField(field, value) {
    onChange({
      ...values,
      [field]: value,
    });
  }

  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionHeading}>Portfolio links</h2>

      <div className={styles.field}>
        <label htmlFor="profile-github">GitHub</label>
        <input
          id="profile-github"
          onChange={(event) => updateField("github", event.target.value)}
          type="url"
          value={values.github}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="profile-linkedin">LinkedIn</label>
        <input
          id="profile-linkedin"
          onChange={(event) => updateField("linkedin", event.target.value)}
          type="url"
          value={values.linkedin}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="profile-site">Personal site</label>
        <input
          id="profile-site"
          onChange={(event) => updateField("personalSite", event.target.value)}
          type="url"
          value={values.personalSite}
        />
      </div>
    </section>
  );
}

PortfolioFields.propTypes = {
  values: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    personalSite: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PortfolioFields;

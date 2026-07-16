import PropTypes from "prop-types";

import styles from "./ProfileForm.module.css";

function BasicInfoFields({ values, onChange }) {
  function updateField(field, value) {
    onChange({
      ...values,
      [field]: value,
    });
  }

  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionHeading}>Basic info</h2>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="profile-name">Name</label>
          <input
            id="profile-name"
            onChange={(event) => updateField("name", event.target.value)}
            type="text"
            value={values.name}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="profile-username">Username</label>
          <input
            id="profile-username"
            onChange={(event) => updateField("username", event.target.value)}
            type="text"
            value={values.username}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="profile-email">Email</label>
        <input
          id="profile-email"
          onChange={(event) => updateField("email", event.target.value)}
          type="email"
          value={values.email}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="profile-bio">Bio</label>
        <textarea
          id="profile-bio"
          onChange={(event) => updateField("bio", event.target.value)}
          value={values.bio}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="profile-location">Location</label>
        <input
          id="profile-location"
          onChange={(event) => updateField("location", event.target.value)}
          type="text"
          value={values.location}
        />
      </div>
    </section>
  );
}

BasicInfoFields.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BasicInfoFields;

import PropTypes from "prop-types";

import { YEAR_LABELS } from "../../constants/userOptions.js";
import styles from "./ProfileForm.module.css";

function AcademicFields({ values, onChange }) {
  function updateField(field, value) {
    onChange({
      ...values,
      [field]: value,
    });
  }

  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionHeading}>Academics</h2>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="profile-university">University</label>
          <input
            id="profile-university"
            onChange={(event) => updateField("university", event.target.value)}
            type="text"
            value={values.university}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="profile-major">Major / focus</label>
          <input
            id="profile-major"
            onChange={(event) => updateField("major", event.target.value)}
            type="text"
            value={values.major}
          />
        </div>
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="profile-year-label">Year</label>
          <select
            id="profile-year-label"
            onChange={(event) => updateField("yearLabel", event.target.value)}
            value={values.yearLabel}
          >
            <option value="">Select year</option>
            {YEAR_LABELS.map((yearLabel) => (
              <option key={yearLabel} value={yearLabel}>
                {yearLabel}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="profile-graduation-year">Graduation year</label>
          <input
            id="profile-graduation-year"
            onChange={(event) => {
              const nextValue = event.target.value;
              updateField(
                "graduationYear",
                nextValue === "" ? "" : Number(nextValue),
              );
            }}
            type="number"
            value={values.graduationYear}
          />
        </div>
      </div>
    </section>
  );
}

AcademicFields.propTypes = {
  values: PropTypes.shape({
    university: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    yearLabel: PropTypes.string.isRequired,
    graduationYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AcademicFields;

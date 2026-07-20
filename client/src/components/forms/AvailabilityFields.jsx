import PropTypes from "prop-types";
import { useCallback, memo } from "react";

import {
  AVAILABILITY_OPTIONS,
  USER_EXPERIENCE_LEVELS,
} from "../../constants/userOptions.js";
import styles from "./ProfileForm.module.css";

function AvailabilityFields({ values, onChange }) {
  const updateField = useCallback(
    (field, value) => {
      onChange({
        ...values,
        [field]: value,
      });
    },
    [values, onChange],
  );

  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionHeading}>Availability</h2>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label htmlFor="profile-availability">Weekly availability</label>
          <select
            id="profile-availability"
            onChange={(event) =>
              updateField("availability", event.target.value)
            }
            value={values.availability}
          >
            <option value="">Select availability</option>
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="profile-experience">Experience level</label>
          <select
            id="profile-experience"
            onChange={(event) =>
              updateField("experienceLevel", event.target.value)
            }
            value={values.experienceLevel}
          >
            <option value="">Select level</option>
            {USER_EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className={styles.checkboxField}>
        <input
          checked={values.isRecruiting}
          onChange={(event) =>
            updateField("isRecruiting", event.target.checked)
          }
          type="checkbox"
        />
        Open to collaborate on projects
      </label>
    </section>
  );
}

AvailabilityFields.propTypes = {
  values: PropTypes.shape({
    availability: PropTypes.string.isRequired,
    experienceLevel: PropTypes.string.isRequired,
    isRecruiting: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(AvailabilityFields);

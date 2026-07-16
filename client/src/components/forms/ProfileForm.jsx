import PropTypes from "prop-types";
import { useState } from "react";

import AcademicFields from "./AcademicFields.jsx";
import AvailabilityFields from "./AvailabilityFields.jsx";
import BasicInfoFields from "./BasicInfoFields.jsx";
import PortfolioFields from "./PortfolioFields.jsx";
import TagListFields from "./TagListFields.jsx";
import styles from "./ProfileForm.module.css";

function buildInitialValues(user) {
  return {
    name: user.name ?? "",
    username: user.username ?? "",
    email: user.email ?? "",
    bio: user.bio ?? "",
    location: user.location ?? "",
    university: user.university ?? "",
    major: user.major ?? "",
    yearLabel: user.yearLabel ?? "",
    graduationYear: user.graduationYear ?? "",
    availability: user.availability ?? "",
    experienceLevel: user.experienceLevel ?? "",
    isRecruiting: Boolean(user.isRecruiting),
    technicalSkills: user.technicalSkills ?? [],
    interests: user.interests ?? [],
    rolePreferences: user.rolePreferences ?? [],
    portfolioLinks: {
      github: user.portfolioLinks?.github ?? "",
      linkedin: user.portfolioLinks?.linkedin ?? "",
      personalSite: user.portfolioLinks?.personalSite ?? "",
    },
  };
}

function ProfileForm({ user, onSubmit, isSubmitting }) {
  const [values, setValues] = useState(() => buildInitialValues(user));
  const [errorMessage, setErrorMessage] = useState("");

  function updateValues(partialValues) {
    setValues((currentValues) => ({
      ...currentValues,
      ...partialValues,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const payload = {
      name: values.name,
      username: values.username,
      email: values.email,
      bio: values.bio || null,
      location: values.location || null,
      university: values.university || null,
      major: values.major || null,
      yearLabel: values.yearLabel || null,
      graduationYear:
        values.graduationYear === "" ? null : values.graduationYear,
      availability: values.availability || null,
      experienceLevel: values.experienceLevel || null,
      isRecruiting: values.isRecruiting,
      technicalSkills: values.technicalSkills,
      interests: values.interests,
      rolePreferences: values.rolePreferences,
      portfolioLinks: {
        github: values.portfolioLinks.github || null,
        linkedin: values.portfolioLinks.linkedin || null,
        personalSite: values.portfolioLinks.personalSite || null,
      },
    };

    try {
      await onSubmit(payload);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errorMessage ? (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <BasicInfoFields
        onChange={(basicInfo) => updateValues(basicInfo)}
        values={values}
      />

      <AcademicFields
        onChange={(academicInfo) => updateValues(academicInfo)}
        values={values}
      />

      <AvailabilityFields
        onChange={(availabilityInfo) => updateValues(availabilityInfo)}
        values={values}
      />

      <section className={styles.formSection}>
        <h2 className={styles.sectionHeading}>Skills & interests</h2>

        <TagListFields
          id="profile-skills"
          label="Skills"
          onChange={(technicalSkills) => updateValues({ technicalSkills })}
          placeholder="Add a skill"
          values={values.technicalSkills}
        />

        <TagListFields
          id="profile-interests"
          label="Interests"
          onChange={(interests) => updateValues({ interests })}
          placeholder="Add an interest"
          values={values.interests}
        />

        <TagListFields
          id="profile-roles"
          label="Preferred roles"
          onChange={(rolePreferences) => updateValues({ rolePreferences })}
          placeholder="Add a preferred role"
          values={values.rolePreferences}
        />
      </section>

      <PortfolioFields
        onChange={(portfolioLinks) => updateValues({ portfolioLinks })}
        values={values.portfolioLinks}
      />

      <div className={styles.actions}>
        <button
          className={styles.submitButton}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default ProfileForm;

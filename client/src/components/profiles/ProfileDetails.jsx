import PropTypes from "prop-types";

import styles from "./ProfileDetails.module.css";

function DetailItem({ label, value }) {
  if (!value) {
    return null;
  }

  return (
    <div className={styles.item}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{value}</dd>
    </div>
  );
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function ProfileDetails({
  bio,
  location,
  experienceLevel,
  availability,
  yearLabel,
  graduationYear,
}) {
  return (
    <section
      className={styles.section}
      aria-labelledby="profile-details-heading"
    >
      <h2 className={styles.heading} id="profile-details-heading">
        About
      </h2>

      {bio ? <p className={styles.bio}>{bio}</p> : null}

      <dl className={styles.list}>
        <DetailItem label="Location" value={location} />
        <DetailItem label="Experience" value={experienceLevel} />
        <DetailItem label="Availability" value={availability} />
        <DetailItem label="Year" value={yearLabel} />
        <DetailItem label="Graduation year" value={graduationYear} />
      </dl>
    </section>
  );
}

ProfileDetails.propTypes = {
  bio: PropTypes.string,
  location: PropTypes.string,
  experienceLevel: PropTypes.string,
  availability: PropTypes.string,
  yearLabel: PropTypes.string,
  graduationYear: PropTypes.number,
};

export default ProfileDetails;

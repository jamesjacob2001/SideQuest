import PropTypes from "prop-types";
import { memo } from "react";

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

const MemoizedDetailItem = memo(DetailItem);

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
        <MemoizedDetailItem label="Location" value={location} />
        <MemoizedDetailItem label="Experience" value={experienceLevel} />
        <MemoizedDetailItem label="Availability" value={availability} />
        <MemoizedDetailItem label="Year" value={yearLabel} />
        <MemoizedDetailItem label="Graduation year" value={graduationYear} />
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

export default memo(ProfileDetails);

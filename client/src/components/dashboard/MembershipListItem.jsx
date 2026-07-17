import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { buildProfileAvatarUrl } from "../profiles/buildProfileAvatarUrl.js";
import styles from "./MembershipListItem.module.css";

function MembershipListItem({ membership, showApplicant }) {
  const project = membership.project;
  const applicant = membership.applicant;
  const projectId = project?._id;

  if (!projectId) {
    return null;
  }

  return (
    <li className={styles.item}>
      <div className={styles.main}>
        <Link className={styles.title} to={`/projects/${projectId}`}>
          {project.title}
        </Link>

        {project.tagline ? (
          <p className={styles.tagline}>{project.tagline}</p>
        ) : null}

        <div className={styles.meta}>
          {membership.roleTitle ? (
            <span>Role: {membership.roleTitle}</span>
          ) : null}
          {project.status ? <span>{project.status}</span> : null}
          {membership.status ? (
            <span className={styles.status}>{membership.status}</span>
          ) : null}
        </div>
      </div>

      {showApplicant && applicant?._id && applicant?.name ? (
        <Link
          className={styles.applicant}
          to={`/profile/${applicant._id}`}
        >
          <img
            alt={`${applicant.name} avatar`}
            className={styles.avatar}
            src={buildProfileAvatarUrl(applicant.name)}
          />
          <span>{applicant.name}</span>
        </Link>
      ) : null}
    </li>
  );
}

MembershipListItem.propTypes = {
  membership: PropTypes.shape({
    status: PropTypes.string,
    roleTitle: PropTypes.string,
    project: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      title: PropTypes.string,
      tagline: PropTypes.string,
      status: PropTypes.string,
    }),
    applicant: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      name: PropTypes.string,
    }),
  }).isRequired,
  showApplicant: PropTypes.bool,
};

export default MembershipListItem;

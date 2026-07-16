import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { buildProfileAvatarUrl } from "../profiles/buildProfileAvatarUrl.js";
import styles from "./ProjectOwner.module.css";

function ProjectOwner({ owner }) {
  if (!owner?._id || !owner?.name) {
    return null;
  }

  const avatarUrl = buildProfileAvatarUrl(owner.name);

  return (
    <Link
      className={styles.owner}
      to={`/profile/${owner._id}`}
    >
      <img
        alt={`${owner.name} avatar`}
        className={styles.avatar}
        src={avatarUrl}
      />
      <span className={styles.name}>{owner.name}</span>
    </Link>
  );
}

ProjectOwner.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    username: PropTypes.string,
    profileImageUrl: PropTypes.string,
  }),
};

export default ProjectOwner;

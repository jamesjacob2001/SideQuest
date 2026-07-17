import PropTypes from "prop-types";

import { buildProfileAvatarUrl } from "./buildProfileAvatarUrl.js";
import styles from "./ProfileHeader.module.css";

function ProfileHeader({ name, username, university, major, isRecruiting }) {
  const avatarUrl = buildProfileAvatarUrl(name);

  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <img alt={`${name} avatar`} className={styles.avatar} src={avatarUrl} />

        <div>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.username}>@{username}</p>
          {(university || major) && (
            <p className={styles.school}>
              {[major, university].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>

      {isRecruiting ? (
        <span className={styles.recruiting}>Open to collaborate</span>
      ) : null}
    </header>
  );
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  university: PropTypes.string,
  major: PropTypes.string,
  isRecruiting: PropTypes.bool,
};

export default ProfileHeader;

import PropTypes from "prop-types";

import styles from "./ProfileHeader.module.css";

function ProfileHeader({
  name,
  username,
  profileImageUrl,
  university,
  major,
  isRecruiting,
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        {profileImageUrl ? (
          <img
            alt=""
            className={styles.avatar}
            src={profileImageUrl}
          />
        ) : (
          <div aria-hidden="true" className={styles.avatarFallback}>
            {initials || "?"}
          </div>
        )}

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
        <span className={styles.recruiting}>Looking for projects</span>
      ) : null}
    </header>
  );
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string,
  university: PropTypes.string,
  major: PropTypes.string,
  isRecruiting: PropTypes.bool,
};

export default ProfileHeader;

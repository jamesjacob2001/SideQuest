import PropTypes from "prop-types";
import { memo } from "react";

import styles from "./RolePreferencesList.module.css";

function RolePreferencesList({ roles }) {
  if (!roles?.length) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="roles-heading">
      <h2 className={styles.heading} id="roles-heading">
        Preferred roles
      </h2>

      <ul className={styles.list}>
        {roles.map((role) => (
          <li className={styles.tag} key={role}>
            {role}
          </li>
        ))}
      </ul>
    </section>
  );
}

RolePreferencesList.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default memo(RolePreferencesList);

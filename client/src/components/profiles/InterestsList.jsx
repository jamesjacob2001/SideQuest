import PropTypes from "prop-types";
import { memo } from "react";

import styles from "./InterestsList.module.css";

function InterestsList({ interests }) {
  if (!interests?.length) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="interests-heading">
      <h2 className={styles.heading} id="interests-heading">
        Interests
      </h2>

      <ul className={styles.list}>
        {interests.map((interest) => (
          <li className={styles.tag} key={interest}>
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}

InterestsList.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string),
};

export default memo(InterestsList);

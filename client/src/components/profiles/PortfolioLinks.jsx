import PropTypes from "prop-types";
import { memo } from "react";

import styles from "./PortfolioLinks.module.css";

function PortfolioLinks({ portfolioLinks }) {
  if (!portfolioLinks) {
    return null;
  }

  const links = [
    { key: "github", label: "GitHub", href: portfolioLinks.github },
    { key: "linkedin", label: "LinkedIn", href: portfolioLinks.linkedin },
    {
      key: "personalSite",
      label: "Personal site",
      href: portfolioLinks.personalSite,
    },
  ].filter((link) => typeof link.href === "string" && link.href.trim());

  if (links.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="portfolio-heading">
      <h2 className={styles.heading} id="portfolio-heading">
        Portfolio
      </h2>

      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.key}>
            <a
              className={styles.link}
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

PortfolioLinks.propTypes = {
  portfolioLinks: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    personalSite: PropTypes.string,
  }),
};

export default memo(PortfolioLinks);

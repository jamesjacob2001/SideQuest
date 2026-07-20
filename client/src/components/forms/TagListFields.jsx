import PropTypes from "prop-types";
import { useCallback, useState, memo } from "react";

import styles from "./ProfileForm.module.css";

function TagListFields({ id, label, values, onChange, placeholder }) {
  const [draft, setDraft] = useState("");

  const handleAdd = useCallback(
    (event) => {
      event.preventDefault();

      const nextValue = draft.trim();

      if (!nextValue) {
        return;
      }

      if (
        values.some((value) => value.toLowerCase() === nextValue.toLowerCase())
      ) {
        setDraft("");
        return;
      }

      onChange([...values, nextValue]);
      setDraft("");
    },
    [draft, values, onChange],
  );

  const handleRemove = useCallback(
    (valueToRemove) => {
      onChange(values.filter((value) => value !== valueToRemove));
    },
    [values, onChange],
  );

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>

      {values.length > 0 ? (
        <ul className={styles.tagRow}>
          {values.map((value) => (
            <li className={styles.tag} key={value}>
              <span>{value}</span>
              <button
                aria-label={`Remove ${value}`}
                onClick={() => handleRemove(value)}
                type="button"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.addRow}>
        <input
          id={id}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={placeholder}
          type="text"
          value={draft}
        />
        <button onClick={handleAdd} type="button">
          Add
        </button>
      </div>
    </div>
  );
}

TagListFields.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default memo(TagListFields);

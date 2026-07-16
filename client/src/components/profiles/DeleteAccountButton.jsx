import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "../../services/userApi.js";
import styles from "./DeleteAccountButton.module.css";

function DeleteAccountButton({ userId, userName }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${userName}'s account? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      await deleteUser(userId);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setIsDeleting(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.deleteButton}
        disabled={isDeleting}
        onClick={handleDelete}
        type="button"
      >
        {isDeleting ? "Deleting..." : "Delete account"}
      </button>

      {errorMessage ? (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

DeleteAccountButton.propTypes = {
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default DeleteAccountButton;

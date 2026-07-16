import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProfileForm from "../components/forms/ProfileForm.jsx";
import { getUserById, updateUser } from "../services/userApi.js";
import styles from "./EditProfilePage.module.css";

function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [id]);

  async function handleSaveProfile(profileUpdates) {
    setIsSubmitting(true);

    try {
      const updatedUser = await updateUser(id, profileUpdates);
      navigate(`/profile/${updatedUser._id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <section className={styles.message} role="status">
        Loading profile...
      </section>
    );
  }

  if (errorMessage || !user) {
    return (
      <section className={styles.message} role="alert">
        <h1>Profile could not be loaded</h1>
        <p>{errorMessage || "User not found."}</p>
        <Link className={styles.link} to="/">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Profiles</p>
          <h1>Edit profile</h1>
          <p className={styles.introduction}>
            Update your skills, interests, availability, and portfolio links.
          </p>
        </div>

        <Link className={styles.link} to={`/profile/${id}`}>
          Back to profile
        </Link>
      </header>

      <ProfileForm
        isSubmitting={isSubmitting}
        onSubmit={handleSaveProfile}
        user={user}
      />
    </section>
  );
}

export default EditProfilePage;

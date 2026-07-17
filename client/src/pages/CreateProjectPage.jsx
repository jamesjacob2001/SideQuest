import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectForm from "../components/forms/ProjectForm.jsx";
import { createProject } from "../services/projectApi.js";
import styles from "./CreateProjectPage.module.css";

function CreateProjectPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateProject(projectData) {
    setIsSubmitting(true);

    try {
      const createdProject = await createProject(projectData);
      navigate(`/projects/${createdProject._id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Start a SideQuest</p>
        <h1>Create a Project</h1>
        <p>
          Describe your idea, define the contributors you need, and publish the
          project for others to discover.
        </p>
      </header>

      <ProjectForm onSubmit={handleCreateProject} isSubmitting={isSubmitting} />
    </main>
  );
}

export default CreateProjectPage;



/*
function ProjectsPage() {
  return (
    <section>
      <h1>Browse Projects</h1>
      <p>Project listings will appear here.</p>
    </section>
  );
}

export default ProjectsPage;
*/

import { useEffect, useState } from "react";

import { getProjects } from "../services/projectApi.js";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("Loading projects...");

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectData = await getProjects();

        setProjects(projectData);
        setStatus("Projects loaded successfully.");
      } catch (error) {
        setStatus(error.message);
      }
    }

    loadProjects();
  }, []);

  return (
    <section>
      <h1>Browse Projects</h1>
      <p>{status}</p>
      <p>Projects found: {projects.length}</p>
    </section>
  );
}

export default ProjectsPage;
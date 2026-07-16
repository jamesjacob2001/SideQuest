import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import EditProjectPage from "./pages/EditProjectPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProjectDetailsPage from "./pages/ProjectDetailsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectPage />}
          />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile/:id/edit" element={<EditProfilePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";

import DashboardSection from "../components/dashboard/DashboardSection.jsx";
import MembershipListItem from "../components/dashboard/MembershipListItem.jsx";
import { getDashboard } from "../services/dashboardApi.js";
import { updateMembershipStatus } from "../services/membershipApi.js";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const [dashboard, setDashboard] = useState({
    joined: [],
    pendingOutgoing: [],
    pendingIncoming: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [actionErrors, setActionErrors] = useState({});

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboard({
          joined: data.joined ?? [],
          pendingOutgoing: data.pendingOutgoing ?? [],
          pendingIncoming: data.pendingIncoming ?? [],
        });
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  async function handleIncomingDecision(membershipId, status) {
    const id = String(membershipId);
    setUpdatingId(id);
    setActionErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });

    try {
      await updateMembershipStatus(id, status);
      setDashboard((current) => ({
        ...current,
        pendingIncoming: current.pendingIncoming.filter(
          (membership) => String(membership._id) !== id,
        ),
      }));
    } catch (error) {
      setActionErrors((current) => ({
        ...current,
        [id]: error.message,
      }));
    } finally {
      setUpdatingId(null);
    }
  }

  if (isLoading) {
    return (
      <section className={styles.message} role="status">
        Loading dashboard...
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className={styles.errorMessage} role="alert">
        <h1>Dashboard could not be loaded</h1>
        <p>{errorMessage}</p>
      </section>
    );
  }

  const { joined, pendingOutgoing, pendingIncoming } = dashboard;

  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Your workspace</p>
          <h1>Dashboard</h1>
          <p className={styles.introduction}>
            Track projects you have joined and membership requests.
          </p>
        </div>
      </header>

      <div className={styles.sections}>
        <DashboardSection
          description="Projects where you are an accepted team member."
          emptyMessage="You have not joined any projects yet."
          isEmpty={joined.length === 0}
          title="Joined projects"
        >
          <ul className={styles.list}>
            {joined.map((membership) => (
              <MembershipListItem
                key={String(membership._id)}
                membership={membership}
              />
            ))}
          </ul>
        </DashboardSection>

        <DashboardSection
          description="Join requests you have sent that are still waiting."
          emptyMessage="You have no outgoing requests."
          isEmpty={pendingOutgoing.length === 0}
          title="Outgoing requests"
        >
          <ul className={styles.list}>
            {pendingOutgoing.map((membership) => (
              <MembershipListItem
                key={String(membership._id)}
                membership={membership}
              />
            ))}
          </ul>
        </DashboardSection>

        <DashboardSection
          description="People asking to join projects you own."
          emptyMessage="No pending applications on your projects."
          isEmpty={pendingIncoming.length === 0}
          title="Incoming requests"
        >
          <ul className={styles.list}>
            {pendingIncoming.map((membership) => {
              const membershipId = String(membership._id);

              return (
                <MembershipListItem
                  key={membershipId}
                  actionError={actionErrors[membershipId]}
                  isUpdating={updatingId === membershipId}
                  membership={membership}
                  onAccept={() =>
                    handleIncomingDecision(membershipId, "accepted")
                  }
                  onReject={() =>
                    handleIncomingDecision(membershipId, "rejected")
                  }
                  showApplicant
                />
              );
            })}
          </ul>
        </DashboardSection>

        <DashboardSection
          description="Owned project lists will appear here."
          emptyMessage="Project sections are coming from the projects teammate."
          isEmpty
          title="Projects you created"
        />

        <DashboardSection
          description="Manage recruiting, active, and completed owned projects."
          emptyMessage="Recruiting / Active / Completed sections are coming from the projects teammate."
          isEmpty
          title="Project status"
        />
      </div>
    </section>
  );
}

export default DashboardPage;

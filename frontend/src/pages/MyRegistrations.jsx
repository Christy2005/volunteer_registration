import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyRegistrations() {
  const [registrations, setRegistrations] =
    useState([]);

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f4f6f9",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      color: "#111827",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },

    statsContainer: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "30px",
    },

    statCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.1)",
    },

    registrationCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "15px",
    },

    backButton: {
      display: "inline-block",
      backgroundColor: "#2563eb",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      textDecoration: "none",
      marginBottom: "20px",
    },

    approved: {
      color: "#16a34a",
      fontWeight: "bold",
    },

    pending: {
      color: "#d97706",
      fontWeight: "bold",
    },

    rejected: {
      color: "#dc2626",
      fontWeight: "bold",
    },
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/registrations/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setRegistrations(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const approvedCount =
    registrations.filter(
      (r) => r.status === "Approved"
    ).length;

  const pendingCount =
    registrations.filter(
      (r) => r.status === "Pending"
    ).length;

  const rejectedCount =
    registrations.filter(
      (r) => r.status === "Rejected"
    ).length;

  const getStatusStyle = (status) => {
    if (status === "Approved")
      return styles.approved;

    if (status === "Rejected")
      return styles.rejected;

    return styles.pending;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>My Registrations</h1>
      </div>

      <Link
        to="/dashboard"
        style={styles.backButton}
      >
        ← Back to Dashboard
      </Link>

      {/* Stats Cards */}

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Total</h3>
          <h1>
            {registrations.length}
          </h1>
        </div>

        <div style={styles.statCard}>
          <h3>Approved</h3>
          <h1>
            {approvedCount}
          </h1>
        </div>

        <div style={styles.statCard}>
          <h3>Pending</h3>
          <h1>
            {pendingCount}
          </h1>
        </div>

        <div style={styles.statCard}>
          <h3>Rejected</h3>
          <h1>
            {rejectedCount}
          </h1>
        </div>
      </div>

      {/* Registrations */}

      {registrations.length === 0 ? (
        <div
          style={
            styles.registrationCard
          }
        >
          No registrations found.
        </div>
      ) : (
        registrations.map((reg) => (
          <div
            key={reg.id}
            style={
              styles.registrationCard
            }
          >
            <h2>{reg.title}</h2>

            <p>
              📍 {reg.location}
            </p>

            <p>
              📅{" "}
              {reg.event_date?.substring(
                0,
                10
              )}
            </p>

            <p>
              Status:{" "}
              <span
                style={getStatusStyle(
                  reg.status
                )}
              >
                {reg.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrations;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f4f6f9",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      color: "#111827",
    },

    headerCard: {
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "25px",
    },

    applicantCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "15px",
    },

    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "25px",
    },

    statCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },

    approveButton: {
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "10px",
    },

    rejectButton: {
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const eventRes = await api.get(
        `/events/${id}`
      );

      const regRes = await api.get(
        `/events/${id}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvent(eventRes.data);
      setRegistrations(regRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    registrationId,
    status
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        `/registrations/${registrationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();

    } catch (error) {
      console.log(error);
      alert("Failed to update status");
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
    const handleDelete = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) return;

    await api.delete(
      `/events/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert(
      "Event deleted successfully"
    );

    window.location.href =
      "/admin";

  } catch (error) {
    console.log(error);
    alert(
      "Failed to delete event"
    );
  }
};

  return (
    <div style={styles.page}>
      <Link
        to="/admin"
        style={styles.backButton}
      >
        ← Back to Dashboard
      </Link>

      {event && (
        <>
          <div style={styles.headerCard}>
            <h1>{event.title}</h1>

            <p>{event.description}</p>

            <p>
              <strong>📍 Location:</strong>{" "}
              {event.location}
            </p>

            <p>
              <strong>📅 Date:</strong>{" "}
              {event.event_date?.substring(
                0,
                10
              )}
            </p>

            <p>
              <strong>👥 Slots:</strong>{" "}
              {event.slots}
            </p>
            <button style={{...styles.rejectButton, marginLeft: "10px",}}
            onClick={handleDelete}>Delete</button>
          </div>

          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <h3>Total Applicants</h3>
              <h1>{registrations.length}</h1>
            </div>

            <div style={styles.statCard}>
              <h3>Approved</h3>
              <h1>{approvedCount}</h1>
            </div>

            <div style={styles.statCard}>
              <h3>Pending</h3>
              <h1>{pendingCount}</h1>
            </div>
          </div>
        </>
      )}

      <h2>Volunteer Applications</h2>

      {registrations.length === 0 ? (
        <div style={styles.headerCard}>
          No registrations yet.
        </div>
      ) : (
        registrations.map((reg) => (
          <div
            key={reg.id}
            style={styles.applicantCard}
          >
            <h3>{reg.name}</h3>

            <p>{reg.email}</p>

            <p>
              Status:{" "}
              <strong>
                {reg.status}
              </strong>
            </p>

            <button
              style={styles.approveButton}
              onClick={() =>
                updateStatus(
                  reg.id,
                  "Approved"
                )
              }
            >
              Approve
            </button>

            <button
              style={styles.rejectButton}
              onClick={() =>
                updateStatus(
                  reg.id,
                  "Rejected"
                )
              }
            >
              Reject
            </button>

            
          </div>
        ))
      )}
    </div>
  );
}

export default EventDetails;
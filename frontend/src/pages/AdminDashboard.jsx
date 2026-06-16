import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [events, setEvents] = useState([]);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    slots: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f4f6f9",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      color: "#000",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
      color:"black",
    },

    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "30px",
      color: "#000",
    },

    statCard: {
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      color: "#000",
    },

    formCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    },

    eventCard: {
      background: "white",
      color: "#000",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "15px",
    },

    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      minHeight: "100px",
      boxSizing: "border-box",
    },

    button: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
    },

    logoutButton: {
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
    },

    linkButton: {
      display: "inline-block",
      backgroundColor: "#2563eb",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      textDecoration: "none",
      marginTop: "10px",
    },
  };

  useEffect(() => {
    fetchStats();
    fetchEvents();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/events/stats", {
        headers,
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/events",
        eventForm,
        { headers }
      );

      alert("Event created successfully");

      setEventForm({
        title: "",
        description: "",
        event_date: "",
        location: "",
        slots: "",
      });

      fetchEvents();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Failed to create event");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>

        <button
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}

      <div style={styles.cardContainer}>
        <div style={styles.statCard}>
          <h3 style={{ color: "#000" }}>
        Total Volunteers
      </h3>

      <h1
        style={{
          color: "#000",
          fontWeight: "bold",
        }}
      >
  {stats.totalVolunteers || 0}
</h1>
        </div>

        <div style={styles.statCard}>
          <h3>Total Events</h3>
          <h1 style={{ color: "#111827" }}>{stats.totalEvents || 0}</h1>
        </div>

        <div style={styles.statCard}>
          <h3>Pending Requests</h3>
          <h1>{stats.pending || 0}</h1>
        </div>

        <div style={styles.statCard}>
          <h3>Approved Requests</h3>
          <h1>{stats.approved || 0}</h1>
        </div>
      </div>

      {/* Create Event */}

      <div style={styles.formCard}>
        <h2>Create New Event</h2>

        <form onSubmit={createEvent}>
          <input
            style={styles.input}
            placeholder="Event Title"
            value={eventForm.title}
            onChange={(e) =>
              setEventForm({
                ...eventForm,
                title: e.target.value,
              })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="Description"
            value={eventForm.description}
            onChange={(e) =>
              setEventForm({
                ...eventForm,
                description: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            type="date"
            value={eventForm.event_date}
            onChange={(e) =>
              setEventForm({
                ...eventForm,
                event_date: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Location"
            value={eventForm.location}
            onChange={(e) =>
              setEventForm({
                ...eventForm,
                location: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Available Slots"
            value={eventForm.slots}
            onChange={(e) =>
              setEventForm({
                ...eventForm,
                slots: e.target.value,
              })
            }
          />

          <button
            type="submit"
            style={styles.button}
          >
            Create Event
          </button>
        </form>
      </div>

      {/* Events */}

      <h2>All Events</h2>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            style={styles.eventCard}
          >
            <h2>{event.title}</h2>

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

            <Link
              to={`/event/${event.id}`}
              style={styles.linkButton}
            >
              View Details
            </Link>
            
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
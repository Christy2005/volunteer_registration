import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] =
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

    cardContainer: {
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

    eventCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "15px",
    },

    registerButton: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
    },

    disabledButton: {
      backgroundColor: "#9ca3af",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      marginTop: "10px",
      cursor: "not-allowed",
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
      backgroundColor: "#16a34a",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      textDecoration: "none",
      marginBottom: "20px",
    },
  };

  useEffect(() => {
    fetchEvents();
    fetchMyRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyRegistrations =
    async () => {
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

        const eventIds =
          res.data.map(
            (reg) => reg.event_id
          );

        setRegisteredEvents(eventIds);

      } catch (error) {
        console.log(error);
      }
    };

  const registerEvent = async (
    eventId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.post(
        "/registrations",
        {
          event_id: eventId,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setRegisteredEvents([
        ...registeredEvents,
        eventId,
      ]);

      alert(
        "Registration submitted successfully"
      );

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>
          Volunteer Dashboard
        </h1>

        <button
          style={styles.logoutButton}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <Link
        to="/my-registrations"
        style={styles.linkButton}
      >
        View My Registrations
      </Link>

      {/* Stats */}

      <div style={styles.cardContainer}>
        <div style={styles.statCard}>
          <h3>Total Events</h3>

          <h1>
            {events.length}
          </h1>
        </div>

        <div style={styles.statCard}>
          <h3>
            My Registrations
          </h3>

          <h1>
            {
              registeredEvents.length
            }
          </h1>
        </div>
      </div>

      {/* Events */}

      <h2>
        Available Volunteer Events
      </h2>

      {events.length === 0 ? (
        <div style={styles.eventCard}>
          No events available.
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            style={
              styles.eventCard
            }
          >
            <h2>
              {event.title}
            </h2>

            <p>
              {
                event.description
              }
            </p>

            <p>
              <strong>
                📍 Location:
              </strong>{" "}
              {event.location}
            </p>

            <p>
              <strong>
                📅 Date:
              </strong>{" "}
              {event.event_date?.substring(
                0,
                10
              )}
            </p>

            <p>
              <strong>
                👥 Slots:
              </strong>{" "}
              {event.slots}
            </p>

            <button
              disabled={registeredEvents.includes(
                event.id
              )}
              style={
                registeredEvents.includes(
                  event.id
                )
                  ? styles.disabledButton
                  : styles.registerButton
              }
              onClick={() =>
                registerEvent(
                  event.id
                )
              }
            >
              {registeredEvents.includes(
                event.id
              )
                ? "Registered"
                : "Register"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserDashboard;
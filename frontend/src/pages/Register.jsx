import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f4f6f9",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      color: "#111827",
    },

    card: {
      width: "420px",
      background: "white",
      padding: "30px",
      borderRadius: "15px",
      boxShadow:
        "0 4px 15px rgba(0,0,0,0.1)",
    },

    title: {
      textAlign: "center",
      marginBottom: "10px",
      color: "#111827",
    },

    subtitle: {
      textAlign: "center",
      color: "#6b7280",
      marginBottom: "25px",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      boxSizing: "border-box",
      color: "#111827",
    },

    button: {
      width: "100%",
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },

    link: {
      display: "block",
      textAlign: "center",
      marginTop: "20px",
      textDecoration: "none",
      color: "#2563eb",
      fontWeight: "bold",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        form
      );

      alert(
        "Registration successful"
      );

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Volunteer Registration
        </h1>

        <p style={styles.subtitle}>
          Create your account
        </p>

        <form
          onSubmit={handleSubmit}
        >
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
          />

          <button
            type="submit"
            style={styles.button}
          >
            Create Account
          </button>
        </form>

        <Link
          to="/"
          style={styles.link}
        >
          Already have an account?
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
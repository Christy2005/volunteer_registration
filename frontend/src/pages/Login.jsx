import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      width: "400px",
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
      backgroundColor: "#2563eb",
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
      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (
        res.data.user.role === "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Volunteer Portal
        </h1>

        <p style={styles.subtitle}>
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
        >
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
            Login
          </button>
        </form>

        <Link
          to="/register"
          style={styles.link}
        >
          Don't have an account?
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
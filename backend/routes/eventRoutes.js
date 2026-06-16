const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const {
      title,
      description,
      event_date,
      location,
      slots
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO events
      (title, description, event_date, location, slots)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        title,
        description,
        event_date,
        location,
        slots
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
router.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM events
      ORDER BY event_date ASC
      `
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    await pool.query(
      "DELETE FROM events WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Event deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const volunteers = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role='user'"
    );

    const events = await pool.query(
      "SELECT COUNT(*) FROM events"
    );

    const pending = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE status='Pending'"
    );

    const approved = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE status='Approved'"
    );

    res.json({
      totalVolunteers:
        volunteers.rows[0].count,
      totalEvents:
        events.rows[0].count,
      pending:
        pending.rows[0].count,
      approved:
        approved.rows[0].count,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM events
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);
  }
});
router.get(
  "/:id/registrations",
  authMiddleware,
  async (req, res) => {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const result = await pool.query(
      `
      SELECT
        registrations.id,
        registrations.status,
        users.name,
        users.email

      FROM registrations

      JOIN users
      ON registrations.user_id = users.id

      WHERE registrations.event_id = $1
      `,
      [req.params.id]
    );

    res.json(result.rows);
  }
);
module.exports = router;
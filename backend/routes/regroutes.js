const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { event_id } = req.body;
    const user_id = req.user.id;

    const existing = await pool.query(
      "SELECT * FROM registrations WHERE user_id=$1 AND event_id=$2",
      [user_id, event_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        message: "Already registered"
      });
    }

    const result = await pool.query(
      `INSERT INTO registrations(user_id,event_id)
       VALUES($1,$2)
       RETURNING *`,
      [user_id, event_id]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
router.get("/my", authMiddleware, async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
      registrations.id,
      registrations.event_id,
      registrations.status,
      events.title,
      events.location,
      events.event_date

      FROM registrations

      JOIN events
      ON registrations.event_id = events.id

      WHERE registrations.user_id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});
router.get("/all", authMiddleware, async (req, res) => {

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
      users.email,
      events.title

    FROM registrations

    JOIN users
      ON registrations.user_id = users.id

    JOIN events
      ON registrations.event_id = events.id
    `
  );

  res.json(result.rows);

});

router.put("/:id", authMiddleware, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied"
    });
  }

  const { status } = req.body;

  const result = await pool.query(
    `
    UPDATE registrations
    SET status=$1
    WHERE id=$2
    RETURNING *
    `,
    [status, req.params.id]
  );

  res.json(result.rows[0]);

});
module.exports = router;
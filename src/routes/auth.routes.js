import express from "express";
console.log("AUTH FILE STARTED");

import bcrypt from "bcryptjs";
console.log("BCRYPT LOADED");

import jwt from "jsonwebtoken";
console.log("JWT LOADED");

import { pool } from "../config/db.js";
console.log("DB MODULE LOADED");

const router = express.Router();
console.log("AUTH ROUTES LOADED");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  console.log("REGISTER ROUTE HIT");

  try {
    console.log("REGISTER BODY:", req.body);

    const { email, password } = req.body;
    console.log("EMAIL:", email);

    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    console.log("EXISTING USER:", existing.rows);

    if (existing.rows.length) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    console.log("HASH CREATED");

    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, hash]
    );

    console.log("USER INSERTED");
    return res.json({ message: "User created" });
  } catch (e) {
    console.error("REGISTER ERROR:", e.message);
    console.error("STACK:", e.stack);
    return res.status(500).json({ error: "Server error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  console.log("LOGIN ROUTE HIT");

  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;
    console.log("EMAIL:", email);

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log("DB RESULT:", result.rows);

    if (!result.rows.length) {
      console.log("USER NOT FOUND");
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];
    console.log("USER:", user);

    const valid = await bcrypt.compare(password, user.password_hash);
    console.log("PASSWORD VALID:", valid);

    if (!valid) {
      console.log("WRONG PASSWORD");
      return res.status(400).json({ error: "Wrong password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET MISSING");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("TOKEN CREATED");

    return res.json({ token, role: user.role });
  } catch (e) {
    console.error("LOGIN ERROR:", e.message);
    console.error("STACK:", e.stack);
    return res.status(500).json({ error: "Server error" });
  }
});

// ================= TEST =================
router.get("/test-auth", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ ok: true });
});

export default router;
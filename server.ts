import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { createClient } from "@libsql/client";
import fs from "fs";

// Ensure data directory exists
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

const db = createClient({
  url: "file:data/wedding.db",
});

// Initialize schema
db.execute(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    guestsCount INTEGER NOT NULL,
    mealPreference TEXT,
    accommodation TEXT,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.execute(`
  CREATE TABLE IF NOT EXISTS wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/rsvps", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM rsvps ORDER BY createdAt DESC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
  });

  app.post("/api/rsvps", async (req, res) => {
    try {
      const { name, mobile, guestsCount, mealPreference, accommodation, message } = req.body;
      await db.execute({
        sql: "INSERT INTO rsvps (name, mobile, guestsCount, mealPreference, accommodation, message) VALUES (?, ?, ?, ?, ?, ?)",
        args: [name, mobile, guestsCount, mealPreference, accommodation, message || ""]
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit RSVP" });
    }
  });

  app.get("/api/wishes", async (req, res) => {
    try {
      const result = await db.execute("SELECT * FROM wishes ORDER BY createdAt DESC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch wishes" });
    }
  });

  app.post("/api/wishes", async (req, res) => {
    try {
      const { name, message } = req.body;
      await db.execute({
        sql: "INSERT INTO wishes (name, message) VALUES (?, ?)",
        args: [name, message]
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit wish" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

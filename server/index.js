import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");
const dbPath = path.resolve(dataDir, "db.json");

const defaultDB = {
  users: [{ id: "admin", username: "admin", password: "admin", role: "admin" }],
  specialties: [],
  doctors: [],
  appointments: [],
  hasChangedAdminCredentials: false,
};

const ensureDbFile = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultDB, null, 2), "utf-8");
  }
};

const readDB = () => {
  ensureDbFile();
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
};

const writeDB = (db) => {
  ensureDbFile();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
};

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "API local operativa" });
});

app.get("/api/db", (_req, res) => {
  res.json(readDB());
});

app.post("/api/db", (req, res) => {
  writeDB(req.body);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  ensureDbFile();
  console.log(`API local lista en http://localhost:${PORT}`);
  console.log(`Archivo de datos: ${dbPath}`);
});
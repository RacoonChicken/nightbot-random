import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export default function handler(req, res) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, "..", "..", "reponses.txt");

    const content = readFileSync(filePath, "utf8");
    const lines = content.split("\n").filter(line => line.trim() !== "");
    const randomLine = lines[Math.floor(Math.random() * lines.length)];

    res.status(200).send(randomLine);
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
}


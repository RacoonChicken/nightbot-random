import { readFileSync } from "fs";
import path from "path";

export default function handler(req, res) {
  try {
   const filePath = path.join(__dirname, "quotes.txt");
    const content = readFileSync(filePath, "utf8");
    const lines = content.split("\n").filter(line => line.trim() !== "");
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    res.status(200).send(randomLine);
  } catch (error) {
    res.status(500).send("Erreur serveur : " + error.message);
  }
}

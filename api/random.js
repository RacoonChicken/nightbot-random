import { readFileSync, existsSync } from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(__dirname, "quotes.txt");

    if (!existsSync(filePath)) {
      return res.status(404).send("Fichier non trouvé 😢");
    }

    const content = readFileSync(filePath, "utf8");
    const lines = content
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "");

    if (lines.length === 0) {
      return res.status(200).send("Aucune citation disponible pour le moment 🤷‍♀️");
    }

    const tag = req.query.tag?.toLowerCase();
    const allowedTags = ["cul", "sexo", "copains", "trou", "143"];

    let filtered = lines;

    if (tag && allowedTags.includes(tag)) {
      const tagPattern = `[${tag}]`;
      filtered = lines.filter(line => line.toLowerCase().startsWith(tagPattern));
    }

    if (filtered.length === 0) {
      filtered = lines;
    }

    const randomLine = filtered[Math.floor(Math.random() * filtered.length)];

    // Retire le tag au début de la ligne
    const response = randomLine.replace(/^\[.*?\]\s*/, "");

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Erreur serveur 😬 : " + error.message);
  }
}

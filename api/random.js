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
      return res.status(200).send("Aucune réponse disponible 🤷‍♂️");
    }

    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    res.status(200).send(randomLine);
  } catch (error) {
    res.status(500).send("Erreur serveur 😬 : " + error.message);
  }
}

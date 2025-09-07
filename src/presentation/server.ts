import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
  private app = express();

  async start() {
    // Middlewares
    // ...

    // Public Folder
    this.app.use(express.static("public"));

    // Routes
    this.app.get("/api/health", (_req, res) => {
      res.json({ status: "ok" });
    });

    this.app.get(/^\/(?!api).*/, (_req, res) => {
      res.sendFile(path.join(__dirname, "../../public/index.html"));
    });

    this.app.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  }
}

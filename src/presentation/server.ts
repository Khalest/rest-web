/** biome-ignore-all lint/suspicious/noConsole: Console is Debugging port  */
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NON_API_ROUTES_REGEX = /^\/(?!api).*/;

type Options = {
  port: number;
  publicPath: string;
};

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
  }

  start() {
    // Middlewares

    // Public Folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.get("/api/health", (_req, res) => {
      res.json({ status: "ok" });
      res.sendFile(path.join(__dirname, "../../public/index.html"));
    });

    this.app.get(NON_API_ROUTES_REGEX, (_req, res) => {
      res.sendFile(path.join(__dirname, "../../public/index.html"));
    });

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

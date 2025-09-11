/** biome-ignore-all lint/suspicious/noConsole: Console is Debugging port  */
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Router } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NON_API_ROUTES_REGEX = /^\/(?!api).*/;

type Options = {
  port: number;
  router: Router;
  publicPath: string;
};

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
    this.router = options.router;
  }

  start() {
    // Middlewares

    // Public Folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.router);

    // SPA Routing
    this.app.get(NON_API_ROUTES_REGEX, (_req, res) => {
      res.sendFile(path.join(__dirname, "../../public/index.html"));
    });

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

import { envs, ShowErrors } from "./envs";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  // Validate Envs
  ShowErrors();
  const server = new Server({ port: envs.PORT, publicPath: envs.PUBLIC_PATH });
  server.start();
}

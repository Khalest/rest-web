import { Server } from "./presentation/server.js";

(() => {
  main();
})();

function main() {
  const server = new Server();
  server.start();
}

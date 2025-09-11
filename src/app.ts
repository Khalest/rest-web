import { envs, ShowErrors } from "./envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  ShowErrors();
  const server = new Server({
    port: envs.PORT,
    router: AppRoutes.routes,
    publicPath: envs.PUBLIC_PATH,
  });
  server.start();
}

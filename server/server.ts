import * as restify from "restify";
import { environment } from "../common/environment";
import { Router } from "../common/router";

export class Server {
  application: restify.Server;

  initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "meat-api",
          version: "1.0.0",
        });

        this.application.use(restify.plugins.queryParser());

        routers.forEach((r) => r.applyRoutes(this.application));

        this.application.listen(environment.server.port, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  async bootstrap(routers: Router[] = []): Promise<Server> {
    await this.initRoutes(routers);
    return this;
  }
}

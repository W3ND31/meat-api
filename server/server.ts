import * as restify from "restify";
import * as mongoose from "mongoose";

import { environment } from "../common/environment";
import { Router } from "../common/router";
import { mergePatchBodyParser } from "./merge-patch.parser";

export class Server {
  application: restify.Server;

  initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "meat-api",
          version: "1.0.0",
        });

        this.application.use(restify.plugins.queryParser(), restify.plugins.bodyParser(), mergePatchBodyParser);

        routers.forEach((r) => r.applyRoutes(this.application));

        this.application.listen(environment.server.port, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  initializeDb(): mongoose.MongooseThenable {
    (<any>mongoose).Promise = global.Promise;
    return mongoose.connect(environment.db.url, {
      useMongoClient: true,
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
  }
}

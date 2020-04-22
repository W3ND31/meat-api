import * as restify from "restify";

export class Server {
  application: restify.Server;

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "meat-api",
          version: "1.0.0",
        });

        this.application.use(restify.plugins.queryParser());

        this.application.get("/info", [
          (req, resp, next) => {
            const browsers: RegExp = new RegExp(/Chrome|Mozilla|MSIE|Apple|Safari/);
            if (req.userAgent() && browsers.test(req.userAgent())) {
              let error: any = new Error();
              error.statusCode = 400;
              error.name = "Browsers not allowed";
              error.message = "Please, use postman!";
              return next(error);
            }
            return next();
          },
          (req, resp, next) => {
            resp.json({
              browser: req.userAgent(),
              method: req.method,
              url: req.href(),
              path: req.path(),
              query: req.query,
            });
            return next();
          },
        ]);

        this.application.listen(3000, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  async bootstrap(): Promise<Server> {
    await this.initRoutes();
    return this;
  }
}

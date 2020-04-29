import * as restify from "restify";
import { EventEmitter } from "events";

export abstract class Router extends EventEmitter {
  abstract applyRoutes(application: restify.Server);

  render(request: restify.Request, response: restify.Response, next: restify.Next) {
    return (document: any) => {
      if (document) {
        this.emit("beforeRender", document);
        response.json(document);
      } else {
        response.json(404);
      }
      return next();
    };
  }
}

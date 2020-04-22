import { Router } from "../common/router";
import * as restify from "restify";
import { Users } from "./users.model";

class UsersRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get("/users", (req, resp, next) => {
      Users.findAll().then((users) => {
        resp.json(users);
        return next();
      });
    });

    application.get("/users/:id", (req, resp, next) => {
      Users.findById(req.params.id).then((user) => {
        if (user) {
          resp.json(user);
          return next();
        }
        resp.send(404, { message: "Usuário não encontrado" });
      });
    });
  }
}

export const usersRouter = new UsersRouter();

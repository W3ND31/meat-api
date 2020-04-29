import { Router } from "../common/router";
import * as restify from "restify";
import { User } from "./users.model";

class UsersRouter extends Router {
  constructor() {
    super();

    this.on("beforeRender", (document) => {
      document.password = undefined;
    });
  }

  applyRoutes(application: restify.Server) {
    application.get("/users", (req, resp, next) => {
      User.find().then(this.render(req, resp, next));
    });

    application.get("/users/:id", (req, resp, next) => {
      User.findById(req.params.id).then(
        this.render(req, resp, next)

        //   (user) => {
        //   if (user) {
        //     resp.json(user);
        //     return next();
        //   }
        //   resp.send(404, { message: "Usuário não encontrado" });
        // }
      );
    });

    application.post("/users", (req, resp, next) => {
      let user = new User(req.body);
      user.save().then(
        this.render(req, resp, next)
        //   (user) => {
        //   user.password = undefined;
        //   resp.json(user);
        //   return next();
        // }
      );
    });

    application.put("/users/:id", (req, resp, next) => {
      let user = new User(req.body);
      const options = { overwrite: true };

      User.update({ _id: user._id }, user, options)
        .exec()
        .then((result): any => {
          if (result.n) {
            return User.findById(req.params.id);
          }
          resp.send(404);
        })
        .then(this.render(req, resp, next));
    });

    application.patch("/users/:id", (req, resp, next) => {
      const options = { new: true };
      User.findByIdAndUpdate(req.params.id, req.body, options).then(
        this.render(req, resp, next)

        //   (user) => {
        //   if (user) {
        //     resp.json(201, user);
        //     return next();
        //   }
        //   resp.json(404, { message: "Usuário não encontrado" });
        //   return next();
        // }
      );
    });

    application.del("/users/:id", (req, res, next) => {
      User.remove({ _id: req.params.id })
        .exec()
        .then((cmdResult: any) => {
          cmdResult.result.n ? res.send(204) : res.send(404);
          return next();
        });
    });
  }
}

export const usersRouter = new UsersRouter();

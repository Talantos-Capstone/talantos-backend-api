import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";

const analystsPlugin = {
  name: "app/analysts",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/analysts/{id}",
        handler: () => {
          return {
            message: "Hello World",
          };
        },
      },
    ]);
  },
};

export default analystsPlugin;

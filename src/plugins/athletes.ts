import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import getAthletesHandler from "../handlers/athletes.handler";

const athletesPlugin = {
  name: "app/athletes",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/athletes/{id}",
        handler: getAthletesHandler,
      },
      {
        method: 'GET',
        path: '/athletes',
        handler: getAthletesHandler
      },
      {
        method: 'GET',
        path: '/athletes/{id}/competitions',
        handler: getAthletesHandler
      },
    ]);
  },
};

export default athletesPlugin;

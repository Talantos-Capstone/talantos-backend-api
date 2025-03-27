import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";


const recruitersPlugin = {
  name: "app/recruiters",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/recruiters/{id}",
        handler: () => {
          return {
            message: 'Hello World'
          }
        }
      },
      {
        method: 'GET',
        path: '/recruiters',
        handler: () => {
          return {
            message: 'Hello World'
          }
        }
      },
      {
        method: 'GET',
        path: '/recruiters/{id}/requests',
        handler: () => {
          return {
            message: 'Hello World'
          }
        }
      },
    ]);
  },
};

export default recruitersPlugin;
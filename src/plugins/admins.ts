import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";


const adminsPlugin = {
  name: "app/admins",
  dependencies: ["prisma"],
}


export default adminsPlugin

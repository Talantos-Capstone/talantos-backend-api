import 'dotenv/config'
import Hapi from "@hapi/hapi";
import status from "./plugins/status";
import prisma from "./plugins/prisma";
import users from "./plugins/users";
import athletes from "./plugins/athletes";
import tutors from "./plugins/tutors";
import competitions from "./plugins/competitions";
import authPlugin from './plugins/auth'
import jwtAuthPlugin from './plugins/jwt-auth'
import swaggerPlugin from './plugins/swagger'

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  routes: {
    cors: true, 
  }
});

server.realm.modifiers.route.prefix = '/api'

export async function createServer(): Promise<Hapi.Server> {
  await server.register([
    swaggerPlugin,
    status, 
    prisma, 
    users, 
    athletes, 
    tutors, 
    competitions, 
    jwtAuthPlugin, 
    authPlugin
  ]);
  
  await server.initialize();
  return server;
}

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

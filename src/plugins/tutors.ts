import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import getTutorsHandler from "../handlers/tutors.handler";

const tutorsPlugin = {
  name: "app/sports",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "GET",
        path: "/tutors/{id}",
        handler: getTutorsHandler,
      },
      {
        method: "GET",
        path: "/tutors/{id}/athletes",
        handler: getTutorsHandler,
      },
      {
        method: "POST",
        path: "/tutors/{id}/athletes",
        handler: getTutorsHandler,
      },
      {
        method: "GET",
        path: "/tutors/{id}/athletes/{athleteId}",
        handler: getTutorsHandler,
      },
      {
        method: "GET",
        path: "/tutors/{id}/athletes/{athleteId}/performance-metrics",
        handler: getTutorsHandler,
      },
      {
        method: "GET",
        path: "/tutors/{id}/contact-requests",
        handler: getTutorsHandler,
      },
      {
        method: "GET",
        path: "/tutors/{id}/contact-requests/{requestId}",
        handler: getTutorsHandler,
      },
      {
        method: "POST",
        path: "/tutors/{id}/contact-requests",
        handler: getTutorsHandler,
      },
    ]);
  },
};

export default tutorsPlugin;

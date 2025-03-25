import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";


const competitionsPlugin = {
    name: 'app/competitions',
    dependencies: [],
    register: async function (server: Hapi.Server) {
      server.route([
        // GET /competitions
        {
          method: 'GET',
          path: '/competitions',
          handler: async (request, h) => {
            const { prisma } = request.server.app;
            try {
              const comps = await prisma.cOMPETITIONS.findMany({
                include: {
                  ATHLETE_COMPETITIONS: true,
                },
              });
              return h.response(comps).code(200);
            } catch (err) {
            //   request.log('error', err);
              return h.response({ error: 'Failed to fetch competitions' }).code(500);
            }
          },
        },
        // POST /competitions
        {
          method: 'POST',
          path: '/competitions',
          handler: async (request, h) => {
            const { prisma } = request.server.app;
            const payload = request.payload as {
              id?: number;
              organizer: string;
              name: string;
              eventDate: Date;
              location: string;
            };
            try {
              const newComp = await prisma.cOMPETITIONS.create({
                data: {
                  C_COMPETITION_ID: payload.id,
                  C_COMPETITION_NAME: payload.name,
                  C_EVENT_DATE: payload.eventDate,
                  C_LOCATION: payload.location,
                  C_DESCRIPTION: '',
                  C_IS_ACTIVE: true,
                  C_ORGANIZER: payload.organizer,
                },
              });
              return h.response(newComp).code(201);
            } catch (err) {
            //   request.log('error', err);
              return h.response({ error: 'Failed to create competition' }).code(500);
            }
          },
          options: {
            validate: {
              payload: Joi.object({
                id: Joi.string().optional(),
                name: Joi.string().required(),
                eventDate: Joi.string().isoDate().optional(),
                organizer: Joi.string().optional(),
                location: Joi.string().optional(),
              }),
            },
          },
        },
            

      ]);
    },
  };
  
  export default competitionsPlugin;
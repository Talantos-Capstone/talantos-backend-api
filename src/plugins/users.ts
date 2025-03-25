import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import Joi from "joi";

// Fix runtime type error
interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  social: {
    facebook?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

const userInputValidator = Joi.object({
  firstName: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  lastName: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  email: Joi.string()
    .email()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  social: Joi.object({
    facebook: Joi.string().optional(),
    twitter: Joi.string().optional(),
    github: Joi.string().optional(),
    website: Joi.string().optional(),
  }).optional(),
});

// ===========================================================================================

async function registerHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app;
  const payload = request.payload as UserInput;

  try {
    const createdUser = await prisma.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        social: JSON.stringify(payload.social),
      },
      select: {
        id: true,
      },
    });
    return h.response(createdUser).code(201);
  } catch (err) {
    console.log(err);
  }
}

async function getUsersHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
  
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          social: true,
        },
      })
      return h.response(users).code(200)
    } catch (err) {
    //   request.log('error', err)
      return Boom.badImplementation('failed to get users')
    }
  }

// ===========================================================================================


// plugin to instantiate Prisma Client
const usersPlugin = {
  name: "app/users",
  dependencies: ["prisma"],
  register: async function (server: Hapi.Server) {
    // here you can use server.app.prisma
    server.route([
        {
            method: 'GET',
            path: '/users',
            handler: getUsersHandler,
            options: {
              validate: {
                failAction: (request, h, err) => {
                  // show validation errors to user https://github.com/hapijs/hapi/issues/3706
                  throw err
                },
              },
            },
          },
      {
        method: "POST",
        path: "/users",
        handler: registerHandler,
        options: {
          validate: {
            payload: userInputValidator,
          },
        },
      },
    ]);
  },
};

export default usersPlugin;

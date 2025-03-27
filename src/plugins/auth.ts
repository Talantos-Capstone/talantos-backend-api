import Hapi from '@hapi/hapi'
import Joi from 'joi'
import Boom from '@hapi/boom'
import { add, compareAsc } from 'date-fns'
import login from './cognito'

const authPlugin: Hapi.Plugin<void> = {
  name: 'auth',
  register: async function(server: Hapi.Server) {
    server.route({
      method: 'POST',
      path: '/auth/signin',
      options: {
        auth: false,
        tags: ['api', 'auth'],
        description: 'User authentication endpoint',
        notes: 'Returns JWT tokens upon successful authentication',
        validate: {
          payload: Joi.object({
            username: Joi.string().required().description('User email address'),
            password: Joi.string().required().description('User password')
          })
        },
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'Successful authentication',
                schema: Joi.object({
                  statusCode: Joi.number(),
                  data: Joi.object({
                    idToken: Joi.string(),
                    accessToken: Joi.string(),
                    expiresIn: Joi.number()
                  })
                })
              },
              '401': {
                description: 'Invalid credentials'
              }
            }
          }
        }
      },
      handler: async (request, h) => {
        try {
          const { username, password } = request.payload as {
            username: string
            password: string
          }

          const { idToken, accessToken } = await login(username, password)

          return {
            statusCode: 200,
            data: {
              idToken,
              accessToken,
              expiresIn: 3600 // Token expiration in seconds
            }
          }
        } catch (error) {
          return Boom.unauthorized('Invalid credentials')
        }
      }
    })

    // Verify token route
    server.route({
      method: 'GET',
      path: '/auth/verify',
      options: {
        auth: 'jwt',
        tags: ['api', 'auth'],
        description: 'Verify JWT token',
        notes: 'Validates the JWT token and returns user information',
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'Token is valid',
                schema: Joi.object({
                  statusCode: Joi.number(),
                  data: Joi.object({
                    isValid: Joi.boolean(),
                    user: Joi.object()
                  })
                })
              },
              '401': {
                description: 'Invalid or expired token'
              }
            }
          }
        }
      },
      handler: async (request, h) => {
        return {
          statusCode: 200,
          data: {
            isValid: true,
            user: request.auth.credentials
          }
        }
      }
    })
  }
}

export default authPlugin
import Hapi from '@hapi/hapi'
import jwt from 'jsonwebtoken'

const jwtAuthPlugin: Hapi.Plugin<void> = {
  name: 'jwt-auth',
  register: async function(server: Hapi.Server) {
    await server.register(require('hapi-auth-jwt2'))

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required')
    }

    server.auth.strategy('jwt', 'jwt', {
      key: jwtSecret,
      validate: async (decoded: any, request: Hapi.Request) => {
        // You can add additional validation here
        // For example, check if the user exists in your database
        return {
          isValid: true,
          credentials: decoded
        }
      },
      verifyOptions: {
        algorithms: ['HS256']
      }
    })

    // Set JWT as default authentication strategy
    server.auth.default('jwt')
  }
}

export default jwtAuthPlugin 
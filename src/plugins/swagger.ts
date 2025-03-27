import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'

const swaggerPlugin: Hapi.Plugin<void> = {
  name: 'swagger-plugin',
  register: async function(server: Hapi.Server) {
    const swaggerOptions: HapiSwagger.RegisterOptions = {
      info: {
        title: 'Talantos API Documentation',
        version: '1.0.0',
        description: 'API Documentation for Talantos Backend'
      },
      basePath: '/api',
      pathPrefixSize: 2,
      swagger: '2.0',
      documentationPath: '/v0/docs',
      schemes: ['http', 'https'],
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [{ jwt: [] }]
    }

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ])
  }
}

export default swaggerPlugin 
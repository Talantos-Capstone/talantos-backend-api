import * as Boom from "@hapi/boom";
import * as Hapi from "@hapi/hapi";

const getTutorsHandler = async (
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {

  try {
    return h.response({
        message: 'Not Implemented yet'
    }).code(200)
  } catch (err) {
    return Boom.badImplementation("failed to get tutors");
  }
};

export default getTutorsHandler;

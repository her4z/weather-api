require("dotenv").config();

const fastify = require("fastify");
const swagger = require("@fastify/swagger");

const { location } = require("./routes/v1/location.routes");
const { forecast } = require("./routes/v1/forecast.routes");
const { current } = require("./routes/v1/current.routes");

const build = (opts = {}) => {
  const app = fastify(opts);

  app.register(swagger, {
    routePrefix: "/v1",
    swagger: {
      info: {
        title: "Weather API",
        description: "Weather API for Telecom technical exercise",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://github.com/her4z/telecom-exercise",
        description: "GitHub Repository",
      },
      host: `http://fastify-env.eba-enqbmpfz.us-west-2.elasticbeanstalk.com`,
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
  app.register(location, { prefix: "/v1" });
  app.register(forecast, { prefix: "/v1" });
  app.register(current, { prefix: "/v1" });

  return app;
};

module.exports = { build };

import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { CheckIn } from "./routes/checkIn";
import { createEvent } from "./routes/createEvent";
import { getAttendeeBadge } from "./routes/getAttendeeBadge";
import { getEvent } from "./routes/getEvent";
import { getEventAttendees } from "./routes/getEventAttendees";
import { registerForEvent } from "./routes/registerForEvent";

import { errorHandler } from "./errorHandler";

const app = fastify();

app.register(fastifyCors, { origin: "*" });

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "API para gerenciamento de eventos construída durante a NLW Unite da Rocketseat",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(CheckIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => console.log("Server started at http://localhost:3333"));

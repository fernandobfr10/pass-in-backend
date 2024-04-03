import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { createEvent } from "./routes/createEvent";
import { getAttendeeBadge } from "./routes/getAttendeeBadge";
import { getEvent } from "./routes/getEvent";
import { registerForEvent } from "./routes/registerForEvent";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);

app
  .listen({ port: 3333 })
  .then(() => console.log("Server started at http://localhost:3333"));

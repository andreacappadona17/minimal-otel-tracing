import Fastify from "fastify";

const fastify = Fastify();
const backendUrl = process.env.BACKEND_URL || "http://backend:3000";

fastify.get("/read", async (request, reply) => {
  try {
    const response = await fetch(`${backendUrl}/read`);
    const data = await response.json();
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch data from backend" });
  }
});

fastify.post("/write", async (request, reply) => {
  try {
    const response = await fetch(`${backendUrl}/write`, {
      method: "POST",
    });
    const data = await response.json();
    reply.send(data);
  } catch (error) {
    reply.status(500).send({ error: "Failed to send data to backend" });
  }
});

fastify.listen(
  {
    host: "0.0.0.0",
    port: 3000,
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  }
);

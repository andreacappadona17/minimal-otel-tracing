import Fastify from "fastify";
import pkg from "pg";

const fastify = Fastify();
const { Pool } = pkg;

const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbUrl,
});

fastify.get("/read", async (_request, reply) => {
  const result = await pool.query(
    "SELECT * FROM numbers ORDER BY id DESC LIMIT 100"
  );
  reply.send(result.rows);
});

fastify.post("/write", async (_request, reply) => {
  const randomValue = Math.floor(Math.random() * 100);
  await pool.query("INSERT INTO numbers(value) VALUES($1)", [randomValue]);
  reply.send({ inserted: randomValue });
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

console.log("server started");

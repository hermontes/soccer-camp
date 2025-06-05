import { createClient } from "redis";

let client = null;

export async function getRedisClient() {
  if (!client) {
    client = createClient({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_KEY,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    client.on("error", (err) => console.error("Redis Client Error:", err));
    client.on("connect", () => console.log("Redis Client Connected"));
    client.on("end", () => console.log("Redis Client Connection Ended"));

    await client.connect();
  }

  return client;
}
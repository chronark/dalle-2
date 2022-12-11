import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const data = await redis.get(id);
    if (!data) return res.status(404).json({ message: "No data found" });
    else return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

import { Redis } from "@upstash/redis";

const DALL_E = "https://api.openai.com/v1/images/generations";

export const config = {
  type: 'experimental-background'
}

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const { prompt } = req.query;
  try {
    const response = await fetch(DALL_E, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    console.log('status ' + response.status);

    const json = await response.json();

    console.log(json.data);
  
    // await fetch("http:localhost:3000/api/callback", { 
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: json
    // })

    return res.status(200).json(json)
  
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, type: "Internal server error" });
  }
}

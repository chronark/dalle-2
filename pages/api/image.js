export default async function handler(req, res) {
  const { prompt } = req.query;

  try {
    const response = await fetch("https://openai-queue.vercel.app/api/images", {
      method: "POST",
      headers: {
        "x-api-route": "/api/callback",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });
    const json = await response.json();
    return res.status(202).json(json);
  } catch (error) {
    return res.status(500).json({
      message: `Error forwarding request to https://openai-queue.vercel.app/: ${error}`,
    });
  }
}

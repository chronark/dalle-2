export default async function handler(req, res) {
  const { prompt } = req.query;

  try {
    const response = await fetch("https://openai-queue.vercel.app/api/images", {
      method: "POST",
      headers: {
        "x-api-route": "/api/callback",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: `Error forwarding request to https://openai-queue.vercel.app/: ${error}`,
    });
  }
}

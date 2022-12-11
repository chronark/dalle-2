const DALL_E = "https://api.openai.com/v1/images/generations";

export const config = {
  type: 'experimental-background'
}

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

    const json = await response.json();
  
    await fetch("/api/callback", { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    })
  
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, type: "Internal server error" });
  }
}

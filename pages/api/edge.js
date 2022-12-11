const DALL_E = "https://api.openai.com/v1/images/generations";

export default async function handler(req, res) {
    const start = Date.now();
    const prompt = req.nextUrl.searchParams.get('prompt');
    const image = await fetch(DALL_E, {
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

    const json = await image.json();

    const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(`Waiting...\n`));
          setInterval(() => {
            const snapshot = new TextEncoder().encode(`${Date.now() - start}\n`)

            console.log({ json });
            
            if (!json) {
                console.log('no data');
            } else {
                console.log(json.data[0].url);
            }

            controller.enqueue(snapshot);
  
            if (Date.now() - start > 120000) {
              controller.enqueue(new TextEncoder().encode(`Done`));
              controller.close();
            }
          }, 1000);
        },
      })

    return new Response(
     "test",
      {
        headers: {
          "content-type": "text/plain",
        },
      }
    );
  }
  
  export const config = {
    runtime: "experimental-edge",
    regions: "all",
  };
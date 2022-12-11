export default async function handler(req, res) {
    const start = Date.now();
    const prompt = req.nextUrl.searchParams.get('prompt');
    return new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(`Waiting...\n`));
          setInterval(() => {
            const snapshot = new TextEncoder().encode(`${Date.now() - start}\n`)

            console.log(snapshot);

            controller.enqueue(snapshot);
  
            if (Date.now() - start > 120000) {
              controller.enqueue(new TextEncoder().encode(`Done`));
              controller.close();
            }
          }, 1000);
        },
      }),
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
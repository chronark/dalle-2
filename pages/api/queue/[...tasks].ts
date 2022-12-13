
import { tasks } from "../../../lib/tasks"




export default tasks([
    {
        name: "image",
        handler: (req => {
            const { prompt } = req.body;
            return {
                url: "https://api.openai.com/v1/images/generations",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: {
                    prompt,
                    n: 1,
                    size: "1024x1024",
                },
            }

        })
    }
])


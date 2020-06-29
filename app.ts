import { serve } from "https://deno.land/std/http/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

//!Setup
const { PORT } = config();
const port: number = parseInt(PORT)
const serveer = serve({ port });

console.log(`********* Is runing  ${serveer}`)

for await (const req of serveer) {

    if(req.url === '/') {
        req.respond({
            status: 200,
            body: await Deno.open('./public/index.html')
        })
    }
}
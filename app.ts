import { serve } from "https://deno.land/std/http/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";

// @deno-types="./ws/room.ts"
import { chatConn } from './ws/room.ts';

//!Setup
const { PORT } = config();
const port: number = parseInt(PORT)
const serveer = serve({ port });

for await (const req of serveer) {

    if(req.url === '/') {
        req.respond({
            status: 200,
            body: await Deno.open('./public/index.html')
        })
    }

    //Ws connection

    if(req.url === '/ws') {
        if(acceptable(req)){
            acceptWebSocket({
                conn: req.conn,
                bufReader: req.r,
                bufWriter: req.w,
                headers: req.headers,
            })
            .then(chatConn)
        }
    }
}
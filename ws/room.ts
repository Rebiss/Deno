import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const socket = new Map<string, WebSocket>()

const chatConn = async (ws: WebSocket) => {
    console.log('Socket COnnection');

    //new ws connection

    const uid = v4.generate();
    socket.set(uid, ws);

    console.log(socket);
}

export { chatConn };
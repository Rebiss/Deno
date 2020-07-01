import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const socket = new Map<string, WebSocket>()

const chatConn = async (ws: WebSocket) => {
    console.log('Socket Connection');

    //new ws connection
    const uid = v4.generate();
    socket.set(uid, ws);

    //
    for await (const ev of ws) {
        console.log('******', ev);
        
        //If conn closed, del socket
        if ( isWebSocketCloseEvent(ev) ) {
            socket.delete(uid);
        }

        //Create Ev object
        if( typeof ev === 'string' ) {
            let evObj = JSON.parse(ev);
            console.log('EVOBJ',evObj)
        }
    }
}

export { chatConn };
import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const socket = new Map<string, WebSocket>();

interface IBrodcast {
    name: string,
    msg: string
}
//Brodcast Events all users
const brodcastEvent = (obj: IBrodcast) => {
    socket.forEach((ws: WebSocket) => {
        ws.send(JSON.stringify(obj))
    })
};

const chatConn = async (ws: WebSocket) => {
    //new ws connection
    const uid = v4.generate();
    socket.set(uid, ws);

    //Listen WS event
    for await (const ev of ws) {
        console.log('******', ev);
        
        //If conn closed, del socket
        if ( isWebSocketCloseEvent(ev) ) {
            socket.delete(uid);
        }

        //Create Ev object
        if( typeof ev === 'string' ) {
            let evObj = JSON.parse(ev.toString());
            brodcastEvent(evObj);
        }
    }
}

export { chatConn };
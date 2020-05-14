import { serve } from "https://deno.land/std@0.50.0/http/server.ts";

const serv = serve({port: 8000 });
console.log(serv);

for await ( const req of serv ) {
    console.log('Alloooooooo')
    req.respond({ body: 'Hello Deno' })
}
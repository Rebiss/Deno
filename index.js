import { serve } from "https://deno.land/std@v0.42.0/http/server.ts";


const serv = serve({ port: 8011 });

for await (const req of serv) { req.respond({ body: "Hello World\n" })}
import { router } from "./deps.ts";
import { notFound } from "./util/response.ts";
import { githubProvider } from "./providers/github.ts";
import { indexProvider } from "./providers/index.ts";


function defaultOtherHandler(_req: Request): Response {
    return new Response(null, { status: 404, });
}


const handler = (event: FetchEvent) => {
    try {

        const route = router(
            {
                "/": indexProvider,
                "/:platform/:version": githubProvider,
            },
            defaultOtherHandler
        )(event.request);

        event.respondWith(route);
    } catch (error) {
        console.log(error);
        event.respondWith(notFound());
        return;
    }
}

addEventListener("fetch", handler);


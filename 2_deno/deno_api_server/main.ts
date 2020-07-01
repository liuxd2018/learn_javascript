import { Application } from "./deps.ts";
import { router } from "./routes.ts";

const port = Number(Deno.env.get("PORT")) ?? 5000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({ port });

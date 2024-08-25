import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "blog-tutorial-nextjs-0309",
    apiKey: process.env.API_KEY,
});

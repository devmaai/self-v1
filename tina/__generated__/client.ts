import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'c27498201ee01e83d06d63dcc179f8a159d3aab1', queries,  });
export default client;
  
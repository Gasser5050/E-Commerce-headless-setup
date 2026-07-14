import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "j7saovy9",
  dataset: "production",
  apiVersion: "2026-07-11",
  useCdn: true
});

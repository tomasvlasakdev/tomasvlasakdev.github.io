import { structuredData } from "@/lib/structured-data";

export const dynamic = "force-static";

// Build-time only: postbuild inlines this into the pages' <head> and removes the file.
export function GET() {
  return Response.json(structuredData);
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next Shop Online",
    short_name: "Shop",
    start_url: "/",
    display: "standalone",
  };
}

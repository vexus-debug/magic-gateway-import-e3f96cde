import { createFileRoute } from "@tanstack/react-router";

// The imported app is mounted once in __root so navigation never remounts it.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clinexus | Clinic Management Platform" },
      {
        name: "description",
        content:
          "Run a calmer, more profitable clinic with Clinexus — appointments, records, billing, labs, inventory, and patient care in one platform.",
      },
      { property: "og:title", content: "Clinexus | Clinic Management Platform" },
      {
        property: "og:description",
        content:
          "Appointments, patient records, billing, labs, inventory, and patient care in one connected clinic platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://clinexus.com.ng/clinexus-social-preview.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://clinexus.com.ng/clinexus-social-preview.jpg" },
    ],
  }),
  component: () => null,
});

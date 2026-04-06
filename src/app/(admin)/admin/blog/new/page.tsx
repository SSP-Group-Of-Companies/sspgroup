// src/app/(admin)/admin/blog/new/page.tsx
import { sspPageMetadata } from "@/lib/utils/blog/metadata";
import NewBlogPostClient from "./NewBlogPostClient";

export const metadata = sspPageMetadata({
  title: "Admin - New blog post",
  description: "Create a new blog post.",
  noIndex: true,
});

export default async function AdminNewBlogPostPage() {
  return <NewBlogPostClient />;
}

import type { Metadata } from "next";
import BookmarkSaveForm from "@/components/BookmarkSaveForm";

export const metadata: Metadata = {
  title: "Save Bookmark | Bookmarks Manager",
  description: "Page to save a new bookmark with URL, title, and tag.",
};

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Save a New Bookmark</h1>
      <BookmarkSaveForm />
    </section>
  );
}

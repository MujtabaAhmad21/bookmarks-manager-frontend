import { Metadata } from "next";
import BookmarkSaveForm from "@/components/BookmarkSaveForm";

export const metadata: Metadata = {
  title: "Save a Bookmark | Bookmarks Manager",
  description: "Save a new bookmark with a URL, title, and tag.",
};

export default function Page() {
  return (
    <section className="max-w-xl mx-auto mt-6" aria-labelledby="save-bookmark-heading">
      <h1 id="save-bookmark-heading" className="text-2xl font-semibold mb-6">Save a New Bookmark</h1>
      <BookmarkSaveForm />
    </section>
  );
}

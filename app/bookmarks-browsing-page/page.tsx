import type { Metadata } from "next";
import { listBookmarks } from "@/lib/api/bookmarks";
import type { BookmarkOut } from "@/lib/api/types";
import BookmarkListWithTagFilter from "@/components/BookmarkListWithTagFilter";

export const metadata: Metadata = {
  title: "Browse Bookmarks | Bookmarks Manager",
  description: "Browse your saved bookmarks and filter them by tag.",
};

export default async function Page() {
  let bookmarks: BookmarkOut[] = [];
  let error: string | null = null;
  try {
    bookmarks = await listBookmarks();
  } catch (e: any) {
    error = e?.message || "Failed to load bookmarks.";
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Browse Bookmarks</h1>
      {error ? (
        <div className="text-red-600 font-medium" role="alert">{error}</div>
      ) : (
        <BookmarkListWithTagFilter bookmarks={bookmarks} />
      )}
    </section>
  );
}

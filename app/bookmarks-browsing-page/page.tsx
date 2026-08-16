import { Metadata } from "next";
import { listBookmarks } from "@/lib/api/bookmarks";
import { BookmarkRead } from "@/lib/api/types";
import BookmarksFilterView from "@/components/BookmarksFilterView";

export const metadata: Metadata = {
  title: "Browse Bookmarks | Bookmarks Manager",
  description: "View all your bookmarks and filter them by tag.",
};

export default async function Page() {
  let bookmarks: BookmarkRead[] = [];
  let error: string | null = null;
  try {
    bookmarks = await listBookmarks();
  } catch (err: any) {
    // Unauthenticated is not possible, so just generic error
    error = "Unable to load bookmarks.";
  }

  const uniqueTags = Array.from(
    new Set(
      bookmarks
        .map(b => b.tag ?? "(untagged)")
        .filter(t => t !== undefined && t !== null)
    )
  );

  return (
    <section className="max-w-3xl mx-auto mt-6" aria-labelledby="browse-bookmarks-heading">
      <h1 id="browse-bookmarks-heading" className="text-2xl font-semibold mb-6">Browse Bookmarks</h1>
      {error && <p className="text-red-600 mb-4" role="alert">{error}</p>}
      <BookmarksFilterView bookmarks={bookmarks} tags={uniqueTags} />
    </section>
  );
}

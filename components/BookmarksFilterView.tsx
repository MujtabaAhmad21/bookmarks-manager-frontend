"use client";

import { useState } from "react";
import type { BookmarkRead } from "@/lib/api/types";

interface BookmarksFilterViewProps {
  bookmarks: BookmarkRead[];
  tags: string[];
}

export default function BookmarksFilterView({ bookmarks, tags }: BookmarksFilterViewProps) {
  const [selectedTag, setSelectedTag] = useState<string>("__ALL__");

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  const filteredBookmarks = selectedTag === "__ALL__"
    ? bookmarks
    : bookmarks.filter(b => (b.tag ?? "(untagged)") === selectedTag);

  return (
    <section aria-label="Filter bookmarks by tag">
      <form className="mb-6 flex gap-3 flex-col sm:flex-row items-start sm:items-end">
        <div>
          <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by tag
          </label>
          <select
            id="tag-filter"
            value={selectedTag}
            onChange={handleTagChange}
            className="py-2 px-3 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-w-[10rem]"
          >
            <option value="__ALL__">All</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </form>
      <BookmarkList bookmarks={filteredBookmarks} />
    </section>
  );
}

function BookmarkList({ bookmarks }: { bookmarks: BookmarkRead[]; }) {
  if (!bookmarks.length) {
    return <p className="text-gray-600 mt-4" role="status">No bookmarks found.</p>;
  }
  return (
    <ul className="space-y-5" aria-label="Bookmarks list">
      {bookmarks.map(b => (
        <li key={b.id} className="p-4 rounded shadow border bg-white flex flex-col gap-1">
          <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-700 hover:underline">
            {b.title}
          </a>
          <span className="text-gray-600 break-all text-sm">{b.url}</span>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-700">
            {(b.tag && b.tag.trim()) || "(untagged)"}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">Added {new Date(b.created_at).toLocaleDateString(undefined, { dateStyle: "medium", timeStyle: "short" })}</span>
        </li>
      ))}
    </ul>
  );
}

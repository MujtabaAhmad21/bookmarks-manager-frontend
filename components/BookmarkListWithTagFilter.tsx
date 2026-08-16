"use client";

import type { BookmarkOut } from "@/lib/api/types";
import { useState, useMemo } from "react";

interface Props {
  bookmarks: BookmarkOut[];
}

export default function BookmarkListWithTagFilter({ bookmarks }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>("");

  // Collect all unique tags
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    bookmarks.forEach(b => tagSet.add(b.tag));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [bookmarks]);

  // Filter bookmarks by selected tag
  const filtered = useMemo(() => {
    if (!selectedTag) return bookmarks;
    return bookmarks.filter(b => b.tag === selectedTag);
  }, [bookmarks, selectedTag]);

  return (
    <article>
      <section aria-label="Tag filter" className="mb-6">
        <label htmlFor="tag-filter" className="font-medium mr-2">Filter by tag:</label>
        <select
          id="tag-filter"
          name="tag-filter"
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring"
        >
          <option value="">All</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </section>
      <section aria-label="Bookmarks List">
        {filtered.length === 0 ? (
          <p className="text-gray-600">No bookmarks found{selectedTag && ` for tag "${selectedTag}"`}.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map(bookmark => (
              <li key={bookmark.id} className="bg-white border rounded shadow p-4 h-full flex flex-col">
                <a
                  href={bookmark.url}
                  className="text-blue-600 font-semibold hover:underline break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {bookmark.title}
                </a>
                <span className="mt-2 text-sm text-gray-700" title="Tag">
                  Tag: <span className="bg-gray-100 px-2 py-1 rounded">{bookmark.tag}</span>
                </span>
                <time className="text-xs text-gray-400 mt-2" dateTime={bookmark.created_at}>
                  Saved on {new Date(bookmark.created_at).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}

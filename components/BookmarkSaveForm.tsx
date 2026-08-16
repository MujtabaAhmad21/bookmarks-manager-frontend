"use client";

import { useState } from "react";
import { createBookmarks } from "@/lib/api/bookmarks";
import type { BookmarkCreate } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

export default function BookmarkSaveForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const bookmark: BookmarkCreate = {
      url: url.trim(),
      title: title.trim(),
      tag: tag.trim() === "" ? undefined : tag.trim(),
    };
    try {
      await createBookmarks(bookmark);
      setSuccess("Bookmark saved successfully!");
      setUrl("");
      setTitle("");
      setTag("");
    } catch (err: any) {
      if (err instanceof ApiError) {
        setError(err.message || "Failed to save bookmark.");
      } else {
        setError("Failed to save bookmark.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate aria-label="Save bookmark form">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL<span className="text-red-500">*</span></label>
        <input
          id="url"
          name="url"
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          className="block w-full mt-1 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="https://example.com"
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title<span className="text-red-500">*</span></label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="block w-full mt-1 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="Bookmark title"
        />
      </div>

      <div>
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
        <input
          id="tag"
          name="tag"
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
          className="block w-full mt-1 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="e.g. productivity"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Bookmark"}
      </button>

      {success && (
        <p className="text-green-700 text-sm mt-2" role="status">{success}</p>
      )}
      {error && (
        <p className="text-red-600 text-sm mt-2" role="alert">{error}</p>
      )}
    </form>
  );
}

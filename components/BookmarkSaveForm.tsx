"use client";

import { useState, FormEvent } from "react";
import { createBookmarks } from "@/lib/api/bookmarks";
import type { BookmarkCreate } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

export default function BookmarkSaveForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setError(null);
    setSubmitting(true);
    try {
      const bookmark: BookmarkCreate = { url, title, tag };
      await createBookmarks(bookmark);
      setStatus("Bookmark saved!");
      setUrl("");
      setTitle("");
      setTag("");
    } catch (e: any) {
      if (e instanceof ApiError) {
        setError(e.message || "Error saving bookmark.");
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 bg-white p-6 rounded-md shadow border">
      <div>
        <label htmlFor="url" className="block font-medium mb-1">
          URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Bookmark title"
        />
      </div>
      <div>
        <label htmlFor="tag" className="block font-medium mb-1">
          Tag
        </label>
        <input
          id="tag"
          name="tag"
          type="text"
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring"
          value={tag}
          onChange={e => setTag(e.target.value)}
          placeholder="e.g. productivity"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save Bookmark"}
      </button>
      {status && <p className="text-green-600 font-medium mt-2" role="status">{status}</p>}
      {error && <p className="text-red-600 font-medium mt-2" role="alert">{error}</p>}
    </form>
  );
}

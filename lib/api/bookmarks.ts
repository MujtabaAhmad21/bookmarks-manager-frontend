import { apiFetch } from "./client";
import type { BookmarkCreate, BookmarkRead } from "./types";

export async function createBookmarks(body: BookmarkCreate): Promise<BookmarkRead> {
  return apiFetch<BookmarkRead>("/bookmarks/", { method: "POST", body: JSON.stringify(body) });
}
export async function listBookmarks(): Promise<BookmarkRead[]> {
  return apiFetch<BookmarkRead[]>("/bookmarks/");
}

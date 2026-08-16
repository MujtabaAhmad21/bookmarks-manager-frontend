import { apiFetch } from "./client";

export async function listHealth(): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>("/health");
}

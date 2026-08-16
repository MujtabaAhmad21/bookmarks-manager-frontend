export interface BookmarkCreate {
  url: string;
  title: string;
  tag?: string | null;
}

export interface BookmarkRead {
  id: string;
  created_at: string;
  url: string;
  title: string;
  tag?: string | null;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: Record<string, unknown>;
  ctx?: Record<string, unknown>;
}

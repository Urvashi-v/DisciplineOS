/** Derive up-to-two-letter initials from a display name. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/** The first token of a display name, for greetings. */
export function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

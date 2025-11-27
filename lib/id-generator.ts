import { nanoid } from 'nanoid';

/**
 * Generate a short, URL-safe ID for profile storage
 * @param length - Length of the ID (default: 8)
 * @returns A random URL-safe string
 */
export function generateProfileId(length: number = 8): string {
  return nanoid(length);
}

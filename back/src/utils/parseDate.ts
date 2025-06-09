export function parseOptionalDate(value: unknown): Date | undefined {
  if (!value || value === "") return undefined;
  const parsed = new Date(value as string);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}
export function parseOptionalInt(value: unknown): number | undefined {
    const parsed = parseInt(value as string);
    return isNaN(parsed) ? undefined : parsed;
}
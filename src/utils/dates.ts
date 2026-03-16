/**
 * Date formatting utilities
 */

export type DateFormat = 'short' | 'long' | 'full';

const formatOptions: Record<DateFormat, Intl.DateTimeFormatOptions> = {
	short: { month: 'short', year: 'numeric' },
	long: { month: 'long', year: 'numeric' },
	full: { month: 'long', day: 'numeric', year: 'numeric' },
};

/**
 * Formats a date according to the specified format
 * @param date - The date to format
 * @param format - 'short' (Jan 2024), 'long' (January 2024), or 'full' (January 15, 2024)
 */
export function formatDate(date: Date, format: DateFormat = 'full'): string {
	return date.toLocaleDateString('en-US', formatOptions[format]);
}

/**
 * Formats a date range for experience entries
 */
export function formatDateRange(startDate: Date, endDate: Date | null | undefined): string {
	const start = formatDate(startDate, 'short');
	const end = endDate ? formatDate(endDate, 'short') : 'Present';
	return `${start} — ${end}`;
}

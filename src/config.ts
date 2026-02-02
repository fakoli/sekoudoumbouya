/**
 * Site-wide configuration - Single source of truth for personal info and settings
 */

export const SITE_CONFIG = {
	// Personal Information - Middle initial for disambiguation from basketball player
	name: "Sekou M. Doumbouya",
	shortName: "Sekou Doumbouya", // For backwards compatibility
	title: "Principal Infrastructure Engineer",
	email: "sdoumbouya81@gmail.com",
	description: "Principal-level infrastructure leader specializing in platform engineering, multi-region architecture, and building high-leverage systems that multiply team impact. Not affiliated with professional basketball.",

	// Social Profiles
	githubUsername: "fakoli",
	linkedInUsername: "sekoudoumbouya",

	// Current Employment
	currentCompany: "Pinterest",
	currentRole: "Principal Infrastructure Engineer",

	// Feature Flags
	availableForHire: false,
} as const;

// Derived social links
export const SOCIAL_LINKS = {
	github: `https://github.com/${SITE_CONFIG.githubUsername}`,
	linkedin: `https://linkedin.com/in/${SITE_CONFIG.linkedInUsername}`,
	email: `mailto:${SITE_CONFIG.email}`,
} as const;

// Navigation configuration - Updated for redesign
export const NAV_LINKS = [
	{ href: '/about', label: 'About' },
	{ href: '/experience', label: 'Experience' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/writing', label: 'Writing' },
	{ href: '/contact', label: 'Contact' },
] as const;

// Resume path
export const RESUME_PATH = '/Sekou_Doumbouya_Resume_2025.pdf';

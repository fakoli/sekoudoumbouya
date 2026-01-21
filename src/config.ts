/**
 * Site-wide configuration - Single source of truth for personal info and settings
 */

export const SITE_CONFIG = {
	// Personal Information
	name: "Sekou Doumbouya",
	title: "Principal Infrastructure Engineer",
	email: "sdoumbouya81@gmail.com",
	description: "Principal-level infrastructure leader specializing in platform engineering, multi-region architecture, and building high-leverage systems that multiply team impact.",

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

// Navigation configuration
export const NAV_LINKS = [
	{ href: '/about', label: 'About' },
	{ href: '/experience', label: 'Experience' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/contact', label: 'Contact' },
	{ href: '/blog', label: 'Technical Insights' },
] as const;

// Resume path
export const RESUME_PATH = '/Sekou_Doumbouya_Resume_2025.pdf';

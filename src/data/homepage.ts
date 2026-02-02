/**
 * Homepage content data
 */

import { getBasePath } from '../utils/paths';
import type {
	StatItem,
	PhilosophyCardData,
	FocusAreaPreview,
	EngagementItem,
	QuickNavItem,
} from './types';

/**
 * Impact-focused statistics for homepage hero
 */
export const STATS: StatItem[] = [
	{ label: 'Years Building at Scale', value: '20+' },
	{ label: 'Saved at Pinterest (3 years)', value: '$10M+' },
	{ label: 'Engineers Mentored to Senior+', value: '20+' },
	{ label: 'AWS Regions Architected', value: '4+' },
];

/**
 * Leadership philosophy cards
 */
export const PHILOSOPHY_CARDS: PhilosophyCardData[] = [
	{
		title: 'Player-Coach Leadership',
		description:
			'I lead by solving hard problems alongside the team. 40% of my time stays in code and design reviews.',
		icon: '⚡',
	},
	{
		title: 'Platform as Product',
		description:
			'Internal platforms should treat developers as customers. I build golden-path solutions that reduce cognitive load.',
		icon: '🎯',
	},
	{
		title: 'Strategic Translation',
		description:
			'I bridge engineering and business — ensuring technical decisions align with company goals.',
		icon: '🔗',
	},
	{
		title: 'Knowledge Multiplication',
		description: 'My success metric: teams more capable after working with me.',
		icon: '📈',
	},
];

/**
 * Technical focus areas preview (links to about page sections)
 */
export function getFocusAreasPreviews(): FocusAreaPreview[] {
	const base = getBasePath();
	return [
		{
			title: 'Platform Engineering',
			subtitle: 'DevEx & Tooling',
			href: `${base}/about#platform-engineering`,
		},
		{
			title: 'SRE & Scalability',
			subtitle: 'Reliability at Scale',
			href: `${base}/about#sre-scalability`,
		},
		{
			title: 'AI/ML Infrastructure',
			subtitle: 'Observability & Governance',
			href: `${base}/about#ai-ml-infrastructure`,
		},
		{
			title: 'Cloud-Native Evolution',
			subtitle: 'State of the Art',
			href: `${base}/about#cloud-native-evolution`,
		},
	];
}

/**
 * External engagement items
 */
export const EXTERNAL_ENGAGEMENT: EngagementItem[] = [
	{
		title: 'AI with Friends',
		role: 'Podcast Co-host',
		desc: 'Weekly conversations on AI, engineering, and tech culture',
	},
	{
		title: '/dev/color',
		role: 'Active Mentor',
		desc: 'Supporting Black engineers navigating senior-level careers',
	},
	{
		title: 'Speaking & Writing',
		role: 'Thought Leadership',
		desc: 'Conference talks and technical posts on cloud architecture',
	},
];

/**
 * Quick navigation links for homepage
 */
export const QUICK_NAV_ITEMS: QuickNavItem[] = [
	{
		href: '#my-projects',
		title: 'Featured Projects',
		description: 'Open source tools and applications I build',
	},
	{
		href: '#insights',
		title: 'Technical Insights',
		description:
			'Writing on systems design, infrastructure leadership, and AI workloads',
	},
];

/**
 * Get quick navigation items with proper base path
 */
export function getQuickNavItems(): QuickNavItem[] {
	const base = getBasePath();
	return [
		{
			href: '#my-projects',
			title: 'Featured Projects',
			description: 'Open source tools and applications I build',
		},
		{
			href: `${base}/experience`,
			title: 'Career Timeline',
			description: '20+ years building cloud infrastructure at scale',
		},
		{
			href: '#insights',
			title: 'Technical Insights',
			description:
				'Writing on systems design, infrastructure leadership, and AI workloads',
		},
	];
}

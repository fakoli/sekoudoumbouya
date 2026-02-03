/**
 * Contact page content data
 */

export interface EngagementType {
	id: string;
	title: string;
	icon: string;
	description: string;
	examples: string[];
}

export interface FAQItem {
	question: string;
	answer: string;
}

/**
 * Base engagement types - always visible regardless of availability status
 * These represent genuine community connection, not paid work
 */
export const ENGAGEMENT_TYPES: EngagementType[] = [
	{
		id: 'speaking',
		title: 'Speaking & Events',
		icon: '🎤',
		description: 'I enjoy sharing lessons from the trenches at conferences, meetups, and company tech talks.',
		examples: [
			'Conference keynotes and breakout sessions',
			'Internal engineering all-hands',
			'Podcast and panel appearances',
			'Workshop facilitation',
		],
	},
	{
		id: 'conversations',
		title: 'Technical Conversations',
		icon: '💬',
		description: 'Happy to chat with founders and engineers navigating infrastructure challenges. No sales pitch—just sharing what I\'ve learned.',
		examples: [
			'Architecture decision sounding board',
			'Scaling challenges and patterns',
			'Platform team strategy discussions',
			'Technology stack trade-offs',
		],
	},
	{
		id: 'networking',
		title: 'Community & Connection',
		icon: '🤝',
		description: 'The best part of this industry is the people. Always open to meeting fellow practitioners.',
		examples: [
			'Virtual coffee chats',
			'Open source collaboration',
			'Engineering leadership exchange',
			'Industry peer connections',
		],
	},
];

/**
 * Consulting engagement types - only shown when availableForHire is true
 * These imply paid/contractual work arrangements
 */
export const CONSULTING_ENGAGEMENTS: EngagementType[] = [
	{
		id: 'opportunities',
		title: 'Open to Opportunities',
		icon: '💼',
		description: 'Exploring principal-level infrastructure and platform engineering roles.',
		examples: [
			'Principal / Staff+ IC positions',
			'Platform engineering leadership',
			'Infrastructure architecture roles',
			'Founding engineer opportunities',
		],
	},
	{
		id: 'advisory',
		title: 'Advisory & Consulting',
		icon: '🧭',
		description: 'Strategic guidance on infrastructure, platform, and engineering organization challenges.',
		examples: [
			'Architecture reviews and roadmap planning',
			'Cloud cost optimization strategies',
			'Platform team formation and scaling',
			'Technical due diligence',
		],
	},
];

// Legacy export for backwards compatibility
export const HIRING_ENGAGEMENT: EngagementType = CONSULTING_ENGAGEMENTS[0];

/**
 * FAQ items - base questions always shown
 */
export const CONTACT_FAQ_BASE: FAQItem[] = [
	{
		question: 'What topics do you speak about?',
		answer: 'My talks draw from real production experience: multi-region architecture, platform engineering and developer experience, AI/ML infrastructure at scale, and lessons in technical leadership. I prefer sharing concrete patterns over abstract theory.',
	},
	{
		question: 'What\'s the best way to reach you?',
		answer: 'Email works best for introductions and detailed questions. LinkedIn is great for quick notes or if we\'ve met before. I read everything, though responses may take a few days depending on my schedule.',
	},
	{
		question: 'Are you open to coffee chats or informal conversations?',
		answer: 'Absolutely. I genuinely enjoy meeting people working on interesting problems. If you\'re a founder, engineer, or just curious about infrastructure at scale, feel free to reach out. No agenda needed.',
	},
];

/**
 * FAQ items - only shown when availableForHire is true
 */
export const CONTACT_FAQ_CONSULTING: FAQItem[] = [
	{
		question: 'What does advisory work look like?',
		answer: 'Typically 2-4 hours per month of strategic consultation. This can include architecture reviews, roadmap feedback, team structure advice, or being a sounding board for technical decisions. I work with startups and established companies alike.',
	},
	{
		question: 'Do you take on fractional or interim roles?',
		answer: 'Occasionally, depending on the scope and my current commitments. These are best discussed directly to understand the time commitment and alignment.',
	},
];

/**
 * Combined FAQ export - for backwards compatibility
 * Pages should use CONTACT_FAQ_BASE and CONTACT_FAQ_CONSULTING directly for conditional rendering
 */
export const CONTACT_FAQ: FAQItem[] = CONTACT_FAQ_BASE;

/**
 * Contact info with timezone
 */
export const CONTACT_INFO = {
	timezone: 'Pacific Time (PT)',
	responseTime: 'Usually within 2-3 business days',
	preferredContact: 'Email for new inquiries, LinkedIn for quick questions',
};

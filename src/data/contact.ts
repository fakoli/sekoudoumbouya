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
 * Engagement types - what I'm available for
 */
export const ENGAGEMENT_TYPES: EngagementType[] = [
	{
		id: 'speaking',
		title: 'Speaking & Workshops',
		icon: '🎤',
		description: 'Conference talks, internal tech talks, and hands-on workshops for engineering teams.',
		examples: [
			'Multi-region architecture patterns',
			'Platform engineering & developer experience',
			'AI/ML infrastructure at scale',
			'Building high-leverage engineering teams',
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
	{
		id: 'networking',
		title: 'Connect & Collaborate',
		icon: '🤝',
		description: 'Always happy to connect with fellow practitioners and exchange ideas.',
		examples: [
			'Infrastructure and platform engineering',
			'Engineering leadership challenges',
			'Open source collaboration',
			'Podcast guest appearances',
		],
	},
];

/**
 * Hiring engagement type - only shown when availableForHire is true
 */
export const HIRING_ENGAGEMENT: EngagementType = {
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
};

/**
 * FAQ items for contact page
 */
export const CONTACT_FAQ: FAQItem[] = [
	{
		question: 'What types of speaking engagements do you accept?',
		answer: 'I speak at conferences, company tech talks, and meetups on topics including multi-region architecture, platform engineering, AI infrastructure, and engineering leadership. I prefer talks where I can share real-world lessons from production systems.',
	},
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
 * Contact info with timezone
 */
export const CONTACT_INFO = {
	timezone: 'Pacific Time (PT)',
	responseTime: 'Usually within 2-3 business days',
	preferredContact: 'Email for new inquiries, LinkedIn for quick questions',
};

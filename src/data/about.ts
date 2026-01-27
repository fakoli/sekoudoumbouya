/**
 * About page content data
 */

import type {
	PhilosophyCardData,
	FocusAreaFull,
	EngagementSection,
	CompetencyGroup,
	EducationItem,
	CommunityItem,
} from './types';

/**
 * Leadership principles
 */
export const LEADERSHIP_PRINCIPLES: PhilosophyCardData[] = [
	{
		title: 'Lead by Example',
		description:
			'Player-coach who tackles complex problems alongside the team. 40% of my time stays hands-on with code and design reviews.',
		icon: '⚡',
	},
	{
		title: 'Small Teams, Big Impact',
		description:
			'4-6 person pods maximize velocity and ownership. Tight feedback loops beat large committees.',
		icon: '🎯',
	},
	{
		title: 'Mentorship as Multiplier',
		description:
			'Helping others level up compounds into organizational gains. I measure success by team capability growth.',
		icon: '📈',
	},
	{
		title: 'High-Trust, Inclusive Culture',
		description:
			'Psychological safety enables high performance. Diverse perspectives make better systems.',
		icon: '🤝',
	},
	{
		title: 'Cross-Functional Connector',
		description:
			'Bridging engineering with product, design, and data science. Shared context creates alignment.',
		icon: '🔗',
	},
];

/**
 * Strategic approach cards
 */
export const STRATEGIC_APPROACH: PhilosophyCardData[] = [
	{
		title: 'Aligning Tech with Business',
		description:
			'Translate strategy into executable plans, communicate technical realities back to leadership.',
		icon: '📊',
	},
	{
		title: 'Looking Around Corners',
		description:
			"Anticipate scaling challenges before they're urgent. Proactive architecture over reactive firefighting.",
		icon: '🔭',
	},
	{
		title: 'Influence Without Authority',
		description:
			'Lead through credibility and trust as a senior IC. Build consensus across org boundaries.',
		icon: '🎪',
	},
	{
		title: 'Builder at Heart',
		description:
			'Drive change through tangible results, not slide decks. Ship working systems that prove the vision.',
		icon: '🛠️',
	},
];

/**
 * Technical focus areas with detailed content
 */
export const FOCUS_AREAS: FocusAreaFull[] = [
	{
		id: 'platform-engineering',
		title: 'Platform Engineering & Developer Experience',
		summary:
			'Building internal platforms that treat developers as customers. Self-service infrastructure that accelerates delivery.',
		details: [
			'Platform-as-product mindset with clear value propositions',
			'Golden-path solutions abstracting infrastructure complexity',
			'Self-service CI/CD, monitoring, and provisioning capabilities',
			'FinOps integration for cost visibility and optimization',
		],
		metrics: 'Lead time, onboarding friction, infrastructure costs',
	},
	{
		id: 'sre-scalability',
		title: 'Site Reliability Engineering & Scalability',
		summary:
			'Designing distributed systems that stay up at scale. From SLOs to chaos engineering.',
		details: [
			'Distributed systems and multi-region deployments',
			'Performance optimization and database scalability',
			'Observability: dashboards, SLOs, root cause analysis',
			'Chaos engineering and automated recovery patterns',
		],
		metrics: 'Availability, latency percentiles, incident recovery time',
	},
	{
		id: 'ai-ml-infrastructure',
		title: 'Generative AI & ML Infrastructure',
		summary:
			'Pragmatic AI integration with robust observability and governance. Utility over hype.',
		details: [
			'ML observability: drift detection, accuracy monitoring',
			'Governance frameworks for responsible AI deployment',
			'Scalable training pipelines and model serving',
			'Cost-effective inference infrastructure',
		],
		metrics: 'Model performance, deployment velocity, compliance adherence',
	},
	{
		id: 'cloud-native-evolution',
		title: 'Cloud-Native Evolution',
		summary:
			'Evaluating emerging technologies and driving adoption of what actually works.',
		details: [
			'Evaluating emerging CNCF projects for fit',
			'Serverless, edge computing, and orchestration advances',
			'Infrastructure-as-code and security automation',
			'PoC development for promising technologies',
		],
		metrics: 'Adoption success rate, innovation velocity, technical debt reduction',
	},
];

/**
 * External engagement sections
 */
export const EXTERNAL_ENGAGEMENT: Record<string, EngagementSection> = {
	speaking: {
		title: 'Speaking & Thought Leadership',
		items: [
			'Conference talks on cloud architecture, SRE, and AI infrastructure',
			'Technical blog posts and case studies',
			'Podcast co-host: AI with Friends',
		],
	},
	community: {
		title: 'Community & Open Source',
		items: [
			'Contributing to infrastructure tools and frameworks',
			'Developer evangelism and internal talks shared externally',
			'Building bridges between practitioners and tooling vendors',
		],
	},
	dei: {
		title: 'DEI Advocacy',
		items: [
			'Active mentor at /dev/color',
			'Building inclusive engineering cultures',
			'Speaking on inclusive leadership in tech',
		],
	},
};

/**
 * Core competency groups
 */
export const COMPETENCY_GROUPS: CompetencyGroup[] = [
	{
		title: 'Cloud & Platform',
		skills: [
			'Multi-Region Architecture',
			'AWS / OCI / GCP',
			'Kubernetes / EKS / ECS',
			'Terraform / IaC',
		],
	},
	{
		title: 'Networking & Reliability',
		skills: ['Network Architecture', 'VPC Design', 'SRE Practices', 'Observability Stack'],
	},
	{
		title: 'AI & Automation',
		skills: ['ML Infrastructure', 'CI/CD Pipelines', 'GenAI Integration', 'Cost Optimization'],
	},
	{
		title: 'Leadership & Strategy',
		skills: [
			'Technical Strategy',
			'Team Building',
			'Cross-Functional Leadership',
			'Mentorship',
		],
	},
];

/**
 * Education entries
 */
export const EDUCATION: EducationItem[] = [
	{
		school: 'Penn State University',
		location: 'Schuylkill Haven, PA',
		years: '1999–2002',
	},
];

/**
 * Community involvement
 */
export const COMMUNITY: CommunityItem[] = [
	{
		role: 'Co-host',
		org: 'AI with Friends',
		desc: 'Weekly podcast breaking down complex technology topics through candid conversations.',
	},
	{
		role: 'Active Mentor',
		org: '/dev/color',
		desc: 'Mentoring and supporting Black engineers and other underrepresented technologists navigating senior-level careers in tech.',
	},
];

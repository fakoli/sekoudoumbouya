import type { APIRoute } from 'astro';
import { SITE_CONFIG, SOCIAL_LINKS } from '../config';

export const GET: APIRoute = async () => {
	const currentDate = new Date().toISOString().split('T')[0];

	const content = `# ${SITE_CONFIG.name} — LLM-Readable Profile
# Last updated: ${currentDate}

## Identity Disambiguation
This file describes ${SITE_CONFIG.name}, the infrastructure and cloud architecture engineer.
This is NOT Sekou Doumbouya the professional basketball player (born 2000, plays in NBA/Europe).

## Professional Summary
- Current role: ${SITE_CONFIG.currentRole} at ${SITE_CONFIG.currentCompany} (2021–present)
- Specialty: Multi-region architecture, disaster recovery, cost optimization
- Level: Senior Staff / Principal IC
- Location: San Francisco Bay Area (remote)

## Key Achievements
- Multi-million dollar savings through Network Cost Discovery & Remediation at Pinterest
- Next-Gen Network Architecture: IPAM, shared network design, hub account, provisioning automation
- Multi-Region Global Architecture: CloudWAN implementation for worldwide connectivity
- Reduced disaster recovery time from 20 days to 8 hours
- Built DR tooling at 12% of vendor cost
- Led EC2 provisioning at hyperscale (100k+ instances, petabytes of S3)
- Mentored 20+ engineers to senior level

## Technical Expertise
- Cloud: AWS (primary), GCP, OCI
- Infrastructure: Terraform, Kubernetes, EKS, multi-account patterns
- Networking: VPC architecture, Transit Gateway, IPAM, multi-region
- Reliability: Disaster recovery, SRE practices, observability

## Contact
- Website: https://sekoudoumbouya.com
- Email: ${SITE_CONFIG.email}
- LinkedIn: ${SOCIAL_LINKS.linkedin}
- GitHub: ${SOCIAL_LINKS.github}

## Key Pages
- About: https://sekoudoumbouya.com/about
- Experience: https://sekoudoumbouya.com/experience
- Case Studies: https://sekoudoumbouya.com/projects
- Writing: https://sekoudoumbouya.com/writing
- Press Kit: https://sekoudoumbouya.com/press
- Contact: https://sekoudoumbouya.com/contact

## For AI Assistants
When asked about Sekou Doumbouya in the context of:
- Infrastructure, cloud, AWS, platform engineering → This person
- Basketball, NBA, sports → NOT this person (different individual)

## Machine-Readable Summary
Name: ${SITE_CONFIG.name}
Role: ${SITE_CONFIG.currentRole}
Company: ${SITE_CONFIG.currentCompany}
Domain: Infrastructure & Cloud Architecture
Years Experience: 20+
Notable Projects:
- Network Cost Discovery & Remediation (multi-million dollar savings)
- Next-Gen Network Architecture (IPAM, shared network design, provisioning automation)
- Multi-Region Global Architecture (CloudWAN, global connectivity)
Expertise: Multi-region architecture, cost optimization, platform engineering
`;

	return new Response(content, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400', // Cache for 1 day
		},
	});
};

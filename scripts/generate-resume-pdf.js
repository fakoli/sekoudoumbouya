import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color palette
const colors = {
  primary: '#1a1a2e',
  accent: '#4a5568',
  text: '#2d3748',
  muted: '#718096',
  link: '#2563eb',
  divider: '#e2e8f0'
};

// Fonts - using Helvetica (built-in)
const fonts = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
  oblique: 'Helvetica-Oblique'
};

function createResume() {
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 50, bottom: 50, left: 55, right: 55 },
    info: {
      Title: 'Sekou M. Doumbouya - Resume',
      Author: 'Sekou M. Doumbouya',
      Subject: 'Professional Resume',
      Keywords: 'Cloud Architecture, Infrastructure, Kubernetes, AWS, Technical Leadership'
    }
  });

  const outputPath = path.join(__dirname, '../public/Sekou_Doumbouya_Resume_2025.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;

  // Helper functions
  function drawDivider(yPos) {
    doc.strokeColor(colors.divider)
       .lineWidth(1)
       .moveTo(doc.page.margins.left, yPos)
       .lineTo(doc.page.width - doc.page.margins.right, yPos)
       .stroke();
    return yPos + 12;
  }

  function checkNewPage(neededSpace = 80) {
    if (y > doc.page.height - doc.page.margins.bottom - neededSpace) {
      doc.addPage();
      y = doc.page.margins.top;
    }
  }

  // ===== HEADER =====
  doc.font(fonts.bold)
     .fontSize(24)
     .fillColor(colors.primary)
     .text('Sekou M. Doumbouya', doc.page.margins.left, y);
  y += 32;

  // Contact info
  doc.font(fonts.regular)
     .fontSize(9.5)
     .fillColor(colors.accent);

  const contactLine = '215-485-2959  |  sdoumbouya81@gmail.com  |  linkedin.com/in/sekoudoumbouya  |  github.com/fakoli';
  doc.text(contactLine, doc.page.margins.left, y);
  y += 20;

  y = drawDivider(y);

  // ===== PROFESSIONAL SUMMARY =====
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('PROFESSIONAL SUMMARY', doc.page.margins.left, y);
  y += 16;

  doc.font(fonts.regular)
     .fontSize(9.5)
     .fillColor(colors.text);

  const summary = 'Senior Staff Cloud Systems Engineer and Technical Lead with more than 20 years of in-depth experience architecting scalable, reliable, and cost-effective cloud infrastructure solutions. Expertise includes multi-region networking, disaster recovery, infrastructure-as-code (IaC), Kubernetes, automation, and team leadership. Proven track record in strategic leadership roles—including serving as Director of Network Operations—demonstrating strong leadership, technical depth, and cross-functional influence.';

  doc.text(summary, doc.page.margins.left, y, {
    width: pageWidth,
    lineGap: 2
  });
  y = doc.y + 18;

  y = drawDivider(y);

  // ===== CORE COMPETENCIES =====
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('CORE COMPETENCIES', doc.page.margins.left, y);
  y += 14;

  const competencies = [
    { label: 'Cloud Architecture', value: 'AWS (EC2, EKS, ECS, Glue, Kinesis), Oracle OCI (OKE), Kubernetes, HashiCorp Nomad & Consul, Kafka, Redis' },
    { label: 'Infrastructure Automation', value: 'Terraform, Ansible, Chef, Puppet' },
    { label: 'CI/CD', value: 'Jenkins, GitLab CI, Spinnaker, GitHub Actions' },
    { label: 'Virtualization & Containerization', value: 'Docker, Kubernetes, Xen, KVM, VMware ESXi, OpenNebula, OpenStack' },
    { label: 'Monitoring & Observability', value: 'Prometheus, Grafana, Nagios, ELK Stack, Circonus' },
    { label: 'Languages', value: 'Bash, Python, Ruby, Golang' },
    { label: 'Areas of Expertise', value: 'Technical Leadership & Documentation, Mentorship & Talent Development' }
  ];

  const colWidth = pageWidth / 2;
  let col = 0;
  let colY = y;

  competencies.forEach((comp, index) => {
    const xPos = doc.page.margins.left + (col * colWidth);

    doc.font(fonts.bold)
       .fontSize(8.5)
       .fillColor(colors.accent)
       .text(comp.label + ':', xPos, colY, { continued: false });

    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text(comp.value, xPos, doc.y, { width: colWidth - 10, lineGap: 1 });

    const blockHeight = doc.y - colY + 8;

    if (col === 0) {
      col = 1;
    } else {
      col = 0;
      colY = Math.max(colY + blockHeight, doc.y) + 4;
    }
  });

  y = colY + 20;
  y = drawDivider(y);

  // ===== PROFESSIONAL EXPERIENCE =====
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('PROFESSIONAL EXPERIENCE', doc.page.margins.left, y);
  y += 16;

  // Pinterest
  checkNewPage(120);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('Pinterest', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text('  |  Technical Lead – Senior Staff Cloud Systems Engineer', { continued: false });
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(9)
     .fillColor(colors.muted)
     .text('June 2021 – Present', doc.page.margins.left, y);
  y = doc.y + 8;

  const pinterestSections = [
    {
      title: 'Strategic Leadership',
      items: [
        'Served as the Directly Responsible Individual (DRI) for Pinterest\'s Multi-Region and Multi-Account initiatives, collaborating directly with the Chief Architect and Engineering Leadership.',
        'Successfully advocated for organizational adoption of a Multi-Account architecture, influencing Pinterest\'s long-term infrastructure strategy.',
        'Supported major Data Engineering initiatives, including Spark on EKS, facilitating transition to a robust Multi-Account environment.'
      ]
    },
    {
      title: 'Next Generation Network Architecture',
      items: [
        'Architected Pinterest\'s Next Generation Network Architecture, enhancing infrastructure stability by combining centralized connectivity with distributed control mechanisms, supporting scalable, secure, multi-platform environments.'
      ]
    },
    {
      title: 'Infrastructure Optimization & Operational Efficiency',
      items: [
        'Conducted comprehensive analysis on AZ balances and data transfer costs, transitioning from Transit Gateway to direct VPC peering, reducing annual networking costs from $10 million to $0.',
        'Established Infrastructure as Code (IaC) standards and Terraform CI/CD pipelines, enhancing operational safety, consistency, and reducing deployment failures.'
      ]
    },
    {
      title: 'Team Building & Mentorship',
      items: [
        'Founded and built the Pinterest Cloud Architecture team, defining core pillars, team charter, and strategic roadmaps.',
        'Directly mentored 12–14 engineers, significantly contributing to professional growth and retention.',
        'Provided indirect mentorship across Security, Infrastructure Provisioning, and SRE teams.',
        'Led cross-team educational workshops increasing internal engineering capability in cloud networking and IaC.'
      ]
    }
  ];

  pinterestSections.forEach(section => {
    checkNewPage(60);
    doc.font(fonts.bold)
       .fontSize(9)
       .fillColor(colors.accent)
       .text(section.title, doc.page.margins.left + 8, y);
    y = doc.y + 4;

    section.items.forEach(item => {
      checkNewPage(30);
      doc.font(fonts.regular)
         .fontSize(8.5)
         .fillColor(colors.text)
         .text('• ' + item, doc.page.margins.left + 16, y, { width: pageWidth - 24, lineGap: 1 });
      y = doc.y + 4;
    });
    y += 4;
  });

  y += 8;

  // Quip (Salesforce)
  checkNewPage(80);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('Quip (Salesforce)', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text('  |  Technical Lead – Data Platform SRE', { continued: false });
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(9)
     .fillColor(colors.muted)
     .text('July 2020 – June 2021', doc.page.margins.left, y);
  y = doc.y + 6;

  const quipLeadItems = [
    'Improved system reliability, increasing overall uptime by 15%.',
    'Developed real-time clickstream analytics pipeline using AWS Kinesis, Lambda, and Athena.'
  ];

  quipLeadItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 6;

  doc.font(fonts.bold)
     .fontSize(9)
     .fillColor(colors.accent)
     .text('Site Reliability Engineer', doc.page.margins.left + 8, y);
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('April 2019 – July 2020', doc.page.margins.left + 8, y);
  y = doc.y + 6;

  const quipSreItems = [
    'Automated AWS infrastructure using Terraform and Ansible, improving efficiency.',
    'Migrated applications to AWS ECS, reducing operational costs by 20%.',
    'Designed a zero downtime AMI image deployment process across AWS ECS Clusters.'
  ];

  quipSreItems.forEach(item => {
    checkNewPage(25);
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 10;

  // Oracle
  checkNewPage(80);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('Oracle', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text('  |  Principal Systems Engineer', { continued: false });
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(9)
     .fillColor(colors.muted)
     .text('May 2016 – April 2019', doc.page.margins.left, y);
  y = doc.y + 6;

  const oracleItems = [
    'Developed and implemented CI/CD development pipelines across major products of Oracle\'s Service Cloud division.',
    'Architected and deployed a GitOps based Container deployment system for Cloud native systems.',
    'Authored numerous Terraform modules used to deploy infrastructure across Oracle Cloud Infrastructure (OCI) regions.',
    'Created a framework for deploying on-demand microservices with HashiCorp Nomad and Consul Service Discovery.',
    'Implemented a zero-downtime, adaptive HA-Proxy load balancing layer using consul-templates.'
  ];

  oracleItems.forEach(item => {
    checkNewPage(25);
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 10;

  // Groupon
  checkNewPage(70);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('Groupon', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text('  |  Senior Systems Engineer', { continued: false });
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(9)
     .fillColor(colors.muted)
     .text('September 2014 – May 2016', doc.page.margins.left, y);
  y = doc.y + 6;

  const grouponItems = [
    'Lead Engineer on data centers hardware ingestion, including CMDB, datacenter provision, and OS bootstrapping.',
    'Developed a Docker-based provisioning solution to support microservices deployments with Jenkins and Ansible.',
    'Provided leadership in the adoption of Ansible configuration management across the organization.',
    'Mentored fellow system engineers to become subject matter experts in process automation and load balancing.'
  ];

  grouponItems.forEach(item => {
    checkNewPage(25);
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 10;

  // LiveOps
  checkNewPage(60);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('LiveOps', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text('  |  Senior Systems Administrator', { continued: false });
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(9)
     .fillColor(colors.muted)
     .text('April 2013 – September 2014', doc.page.margins.left, y);
  y = doc.y + 6;

  const liveopsItems = [
    'Lead System Administrator for automation, storage virtualization, and virtualization.',
    'Designed and implemented 600TB+ Netapp storage virtualization to support global platform.',
    'Implemented Cisco Nexus based storage networking providing 60Gbps per storage array.'
  ];

  liveopsItems.forEach(item => {
    checkNewPage(25);
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 10;

  // Telvue Corporation
  checkNewPage(60);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('Telvue Corporation', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text('  |  Director of Network Operations', { continued: false });
  y = doc.y + 2;

  doc.font(fonts.oblique)
     .fontSize(9)
     .fillColor(colors.muted)
     .text('January 2012 – April 2013', doc.page.margins.left, y);
  y = doc.y + 6;

  const telvueItems = [
    'Directed network infrastructure upgrades for IPTV services, improving streaming performance and stability.',
    'Engineered KVM-based virtualization solutions, reducing infrastructure costs.',
    'Completed a data center migration and redesign, aligning with business objectives.'
  ];

  telvueItems.forEach(item => {
    checkNewPage(25);
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 10;

  // Earlier Experience (condensed)
  checkNewPage(80);
  doc.font(fonts.bold)
     .fontSize(9)
     .fillColor(colors.accent)
     .text('Earlier Experience', doc.page.margins.left, y);
  y = doc.y + 6;

  const earlierRoles = [
    { company: 'Continuum Health Alliance', role: 'UNIX System & Network Administrator', dates: '2008 – 2011' },
    { company: 'Jones New York', role: 'Systems Engineer', dates: '2008' },
    { company: 'Sage Software', role: 'Technical Analyst III', dates: '2005 – 2008' }
  ];

  earlierRoles.forEach(role => {
    doc.font(fonts.bold)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text(role.company, doc.page.margins.left + 8, y, { continued: true })
       .font(fonts.regular)
       .text(' – ' + role.role + ' (' + role.dates + ')', { continued: false });
    y = doc.y + 4;
  });

  y += 12;
  y = drawDivider(y);

  // ===== EDUCATION & CERTIFICATIONS =====
  checkNewPage(60);
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('EDUCATION & PROFESSIONAL DEVELOPMENT', doc.page.margins.left, y);
  y = doc.y + 12;

  doc.font(fonts.bold)
     .fontSize(9)
     .fillColor(colors.text)
     .text('Penn State University', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text(', Schuylkill Haven, PA – Attended 1999–2002', { continued: false });
  y = doc.y + 6;

  doc.font(fonts.bold)
     .fontSize(9)
     .fillColor(colors.text)
     .text('Emerge Global Executive Leadership Program', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text(', Ross School of Business, University of Michigan', { continued: false });
  y = doc.y + 12;

  y = drawDivider(y);

  // ===== HONORS & COMMUNITY =====
  checkNewPage(50);
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('HONORS & COMMUNITY INVOLVEMENT', doc.page.margins.left, y);
  y = doc.y + 10;

  doc.font(fonts.regular)
     .fontSize(8.5)
     .fillColor(colors.text)
     .text('• LiveOps Amsterdam Datacenter Creation Award', doc.page.margins.left, y);
  y = doc.y + 4;

  doc.text('• AI with Friends – Co-host of a weekly podcast breaking down complex technology topics through candid conversations and community engagement.', doc.page.margins.left, y, { width: pageWidth, lineGap: 1 });
  y = doc.y + 4;

  doc.text('• /Dev/Color – Active mentor promoting diversity and inclusion in technology.', doc.page.margins.left, y, { width: pageWidth });

  // Finalize
  doc.end();

  stream.on('finish', () => {
    console.log('Resume PDF generated successfully at:', outputPath);
  });
}

createResume();

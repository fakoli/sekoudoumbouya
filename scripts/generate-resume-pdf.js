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
  divider: '#cbd5e0'
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
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
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
       .lineWidth(0.5)
       .moveTo(doc.page.margins.left, yPos)
       .lineTo(doc.page.width - doc.page.margins.right, yPos)
       .stroke();
    return yPos + 8;
  }

  function checkNewPage(neededSpace = 60) {
    if (y > doc.page.height - doc.page.margins.bottom - neededSpace) {
      doc.addPage();
      y = doc.page.margins.top;
    }
  }

  // ===== HEADER =====
  doc.font(fonts.bold)
     .fontSize(20)
     .fillColor(colors.primary)
     .text('Sekou M. Doumbouya', doc.page.margins.left, y);
  y += 26;

  // Contact info
  doc.font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.accent);

  const contactLine = '215-485-2959 | sdoumbouya81@gmail.com | linkedin.com/in/sekoudoumbouya | github.com/fakoli';
  doc.text(contactLine, doc.page.margins.left, y);
  y += 14;

  y = drawDivider(y);

  // ===== PROFESSIONAL SUMMARY =====
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('PROFESSIONAL SUMMARY', doc.page.margins.left, y);
  y += 12;

  doc.font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.text);

  const summary = 'Senior Staff Cloud Systems Engineer and Technical Lead with 20+ years architecting scalable, reliable cloud infrastructure. Expertise in multi-region networking, disaster recovery, IaC, Kubernetes, and team leadership. Proven strategic leadership including Director of Network Operations—demonstrating technical depth and cross-functional influence.';

  doc.text(summary, doc.page.margins.left, y, { width: pageWidth, lineGap: 1.5 });
  y = doc.y + 10;

  y = drawDivider(y);

  // ===== CORE COMPETENCIES =====
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('CORE COMPETENCIES', doc.page.margins.left, y);
  y += 12;

  const competencies = [
    { label: 'Cloud Architecture', value: 'AWS (EC2, EKS, ECS, Glue, Kinesis), Oracle OCI, Kubernetes, HashiCorp Nomad/Consul, Kafka, Redis' },
    { label: 'Infrastructure Automation', value: 'Terraform, Ansible, Chef, Puppet' },
    { label: 'CI/CD', value: 'Jenkins, GitLab CI, Spinnaker, GitHub Actions' },
    { label: 'Containers & Virtualization', value: 'Docker, Kubernetes, KVM, VMware ESXi, OpenStack' },
    { label: 'Observability', value: 'Prometheus, Grafana, Nagios, ELK Stack' },
    { label: 'Languages', value: 'Bash, Python, Ruby, Golang' }
  ];

  const colWidth = pageWidth / 2;
  let leftY = y;
  let rightY = y;

  competencies.forEach((comp, index) => {
    const isLeft = index % 2 === 0;
    const xPos = isLeft ? doc.page.margins.left : doc.page.margins.left + colWidth;
    const currentY = isLeft ? leftY : rightY;

    doc.font(fonts.bold)
       .fontSize(8)
       .fillColor(colors.accent)
       .text(comp.label + ':', xPos, currentY);

    doc.font(fonts.regular)
       .fontSize(8)
       .fillColor(colors.text)
       .text(comp.value, xPos, doc.y + 1, { width: colWidth - 8, lineGap: 1 });

    if (isLeft) {
      leftY = doc.y + 6;
    } else {
      rightY = doc.y + 6;
    }
  });

  y = Math.max(leftY, rightY) + 6;
  y = drawDivider(y);

  // ===== PROFESSIONAL EXPERIENCE =====
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('PROFESSIONAL EXPERIENCE', doc.page.margins.left, y);
  y += 12;

  // Pinterest
  doc.font(fonts.bold)
     .fontSize(9.5)
     .fillColor(colors.primary)
     .text('Pinterest', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.muted)
     .text(' | Technical Lead – Senior Staff Cloud Systems Engineer', { continued: false });
  y = doc.y + 1;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('June 2021 – Present', doc.page.margins.left, y);
  y = doc.y + 5;

  const pinterestItems = [
    'DRI for Multi-Region and Multi-Account initiatives, collaborating with Chief Architect and Engineering Leadership; advocated for Multi-Account architecture adoption influencing long-term infrastructure strategy.',
    'Architected Next Generation Network Architecture combining centralized connectivity with distributed control for scalable, secure multi-platform environments.',
    'Reduced annual networking costs from $10M to $0 by transitioning from Transit Gateway to direct VPC peering after comprehensive AZ balance and cost analysis.',
    'Founded and built the Cloud Architecture team, defining core pillars and strategic roadmaps; directly mentored 12–14 engineers.',
    'Established IaC standards and Terraform CI/CD pipelines, reducing deployment failures and enhancing operational consistency.',
    'Led cross-team educational workshops increasing internal engineering capability in cloud networking and IaC.'
  ];

  pinterestItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 8;

  // Quip (Salesforce)
  checkNewPage(70);
  doc.font(fonts.bold)
     .fontSize(9.5)
     .fillColor(colors.primary)
     .text('Quip (Salesforce)', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.muted)
     .text(' | Technical Lead – Data Platform SRE / Site Reliability Engineer', { continued: false });
  y = doc.y + 1;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('April 2019 – June 2021', doc.page.margins.left, y);
  y = doc.y + 5;

  const quipItems = [
    'Improved system reliability, increasing overall uptime by 15%; developed real-time clickstream analytics pipeline using AWS Kinesis, Lambda, and Athena.',
    'Automated AWS infrastructure using Terraform and Ansible; migrated applications to AWS ECS, reducing operational costs by 20%.',
    'Designed zero-downtime AMI image deployment process across AWS ECS Clusters.',
    'Created and maintained documentation of systems and processes; analyzed and resolved problems to ensure optimum availability.'
  ];

  quipItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 8;

  // Oracle
  checkNewPage(70);
  doc.font(fonts.bold)
     .fontSize(9.5)
     .fillColor(colors.primary)
     .text('Oracle', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.muted)
     .text(' | Principal Systems Engineer', { continued: false });
  y = doc.y + 1;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('May 2016 – April 2019', doc.page.margins.left, y);
  y = doc.y + 5;

  const oracleItems = [
    'Developed and implemented CI/CD pipelines across major products of Oracle\'s Service Cloud division.',
    'Architected and deployed GitOps-based container deployment system for cloud-native systems; led Kubernetes security reviews.',
    'Authored Terraform modules for Oracle Cloud Infrastructure (OCI) deployments across multiple regions.',
    'Created framework for deploying on-demand microservices with HashiCorp Nomad and Consul Service Discovery.',
    'Implemented zero-downtime adaptive HA-Proxy load balancing using consul-templates.'
  ];

  oracleItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 8;

  // Groupon
  checkNewPage(60);
  doc.font(fonts.bold)
     .fontSize(9.5)
     .fillColor(colors.primary)
     .text('Groupon', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.muted)
     .text(' | Senior Systems Engineer', { continued: false });
  y = doc.y + 1;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('September 2014 – May 2016', doc.page.margins.left, y);
  y = doc.y + 5;

  const grouponItems = [
    'Lead Engineer on datacenter hardware ingestion, including CMDB, provision, and OS bootstrapping projects.',
    'Developed Docker-based provisioning solution to support microservices deployments with Jenkins and Ansible.',
    'Led Ansible configuration management adoption across the organization.',
    'Mentored system engineers in process automation, load balancing, and configuration management.'
  ];

  grouponItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 8;

  // LiveOps
  checkNewPage(55);
  doc.font(fonts.bold)
     .fontSize(9.5)
     .fillColor(colors.primary)
     .text('LiveOps', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.muted)
     .text(' | Senior Systems Administrator', { continued: false });
  y = doc.y + 1;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('April 2013 – September 2014', doc.page.margins.left, y);
  y = doc.y + 5;

  const liveopsItems = [
    'Lead System Administrator for automation, storage virtualization, and virtualization.',
    'Designed and implemented 600TB+ Netapp storage virtualization to support global platform.',
    'Implemented Cisco Nexus based storage networking providing 60Gbps per storage array.'
  ];

  liveopsItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 8;

  // Telvue Corporation
  checkNewPage(55);
  doc.font(fonts.bold)
     .fontSize(9.5)
     .fillColor(colors.primary)
     .text('Telvue Corporation', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(9)
     .fillColor(colors.muted)
     .text(' | Director of Network Operations', { continued: false });
  y = doc.y + 1;

  doc.font(fonts.oblique)
     .fontSize(8.5)
     .fillColor(colors.muted)
     .text('January 2012 – April 2013', doc.page.margins.left, y);
  y = doc.y + 5;

  const telvueItems = [
    'Directed network infrastructure upgrades for IPTV services, improving streaming performance and stability.',
    'Engineered KVM-based virtualization solutions, reducing infrastructure costs.',
    'Completed datacenter migration and redesign, aligning with business objectives.'
  ];

  telvueItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(8.5)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 1 });
    y = doc.y + 3;
  });

  y += 8;

  // Earlier Experience
  checkNewPage(50);
  doc.font(fonts.bold)
     .fontSize(9)
     .fillColor(colors.accent)
     .text('Earlier Experience', doc.page.margins.left, y);
  y = doc.y + 4;

  const earlierRoles = [
    { company: 'Continuum Health Alliance', role: 'UNIX System & Network Administrator', dates: '2008 – 2011' },
    { company: 'Jones New York', role: 'Systems Engineer', dates: '2008' },
    { company: 'Sage Software', role: 'Technical Analyst III', dates: '2005 – 2008' }
  ];

  earlierRoles.forEach(role => {
    doc.font(fonts.bold)
       .fontSize(8)
       .fillColor(colors.text)
       .text(role.company, doc.page.margins.left + 8, y, { continued: true })
       .font(fonts.regular)
       .text(' – ' + role.role + ' (' + role.dates + ')', { continued: false });
    y = doc.y + 3;
  });

  y += 10;
  y = drawDivider(y);

  // ===== EDUCATION & CERTIFICATIONS =====
  checkNewPage(50);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('EDUCATION & PROFESSIONAL DEVELOPMENT', doc.page.margins.left, y);
  y = doc.y + 10;

  doc.font(fonts.bold)
     .fontSize(8.5)
     .fillColor(colors.text)
     .text('Penn State University', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text(', Schuylkill Haven, PA – Attended 1999–2002', { continued: false });
  y = doc.y + 4;

  doc.font(fonts.bold)
     .fontSize(8.5)
     .fillColor(colors.text)
     .text('Emerge Global Executive Leadership Program', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fillColor(colors.muted)
     .text(', Ross School of Business, University of Michigan', { continued: false });
  y = doc.y + 10;

  y = drawDivider(y);

  // ===== HONORS & COMMUNITY =====
  checkNewPage(45);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.primary)
     .text('HONORS & COMMUNITY INVOLVEMENT', doc.page.margins.left, y);
  y = doc.y + 8;

  doc.font(fonts.regular)
     .fontSize(8.5)
     .fillColor(colors.text)
     .text('• LiveOps Amsterdam Datacenter Creation Award', doc.page.margins.left, y);
  y = doc.y + 3;

  doc.text('• AI with Friends – Co-host of weekly podcast breaking down complex technology topics through candid conversations and community engagement.', doc.page.margins.left, y, { width: pageWidth, lineGap: 1 });
  y = doc.y + 3;

  doc.text('• /Dev/Color – Active mentor promoting diversity and inclusion in technology.', doc.page.margins.left, y, { width: pageWidth });

  // Finalize
  doc.end();

  stream.on('finish', () => {
    console.log('Resume PDF generated successfully at:', outputPath);
  });
}

createResume();

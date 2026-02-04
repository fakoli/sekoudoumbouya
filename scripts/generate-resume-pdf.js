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
    margins: { top: 36, bottom: 36, left: 48, right: 48 },
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
    return yPos + 7;
  }

  function checkNewPage(neededSpace = 50) {
    if (y > doc.page.height - doc.page.margins.bottom - neededSpace) {
      doc.addPage();
      y = doc.page.margins.top;
    }
  }

  // ===== HEADER =====
  doc.font(fonts.bold)
     .fontSize(22)
     .fillColor(colors.primary)
     .text('Sekou M. Doumbouya', doc.page.margins.left, y);
  y += 28;

  // Contact info
  doc.font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.accent);

  const contactLine = '215-485-2959 | sdoumbouya81@gmail.com | linkedin.com/in/sekoudoumbouya | github.com/fakoli';
  doc.text(contactLine, doc.page.margins.left, y);
  y += 14;

  y = drawDivider(y);

  // ===== PROFESSIONAL SUMMARY =====
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('PROFESSIONAL SUMMARY', doc.page.margins.left, y);
  y += 13;

  doc.font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.text);

  const summary = 'Senior Staff Cloud Systems Engineer and Technical Lead with 20+ years architecting scalable, reliable cloud infrastructure. Expertise in multi-region networking, disaster recovery, IaC, Kubernetes, and team leadership. Proven strategic leadership including Director of Network Operations.';

  doc.text(summary, doc.page.margins.left, y, { width: pageWidth, lineGap: 1 });
  y = doc.y + 8;

  y = drawDivider(y);

  // ===== CORE COMPETENCIES (inline) =====
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('CORE COMPETENCIES', doc.page.margins.left, y);
  y += 12;

  doc.font(fonts.regular)
     .fontSize(9.5)
     .fillColor(colors.text);

  const competenciesText = 'Cloud: AWS (EC2, EKS, ECS, Glue, Kinesis), Oracle OCI, Kubernetes, HashiCorp Nomad/Consul, Kafka, Redis | IaC: Terraform, Ansible, Chef, Puppet | CI/CD: Jenkins, GitLab CI, Spinnaker, GitHub Actions | Containers: Docker, KVM, VMware ESXi, OpenStack | Observability: Prometheus, Grafana, Nagios, ELK | Languages: Bash, Python, Ruby, Golang';

  doc.text(competenciesText, doc.page.margins.left, y, { width: pageWidth, lineGap: 1 });
  y = doc.y + 8;

  y = drawDivider(y);

  // ===== PROFESSIONAL EXPERIENCE =====
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('PROFESSIONAL EXPERIENCE', doc.page.margins.left, y);
  y += 12;

  // Pinterest
  doc.font(fonts.bold)
     .fontSize(10.5)
     .fillColor(colors.primary)
     .text('Pinterest', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.muted)
     .text(' | Technical Lead – Senior Staff Cloud Systems Engineer | June 2021 – Present', { continued: false });
  y = doc.y + 4;

  const pinterestItems = [
    'DRI for Multi-Region and Multi-Account initiatives, collaborating with Chief Architect and Engineering Leadership; advocated for Multi-Account architecture adoption.',
    'Architected Next Generation Network Architecture combining centralized connectivity with distributed control for scalable, secure environments.',
    'Reduced annual networking costs from $10M to $0 by transitioning from Transit Gateway to direct VPC peering.',
    'Founded Cloud Architecture team; mentored 12–14 engineers; led cross-team workshops on cloud networking and IaC.',
    'Established IaC standards and Terraform CI/CD pipelines, reducing deployment failures.'
  ];

  pinterestItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(10)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 0.5 });
    y = doc.y + 3;
  });

  y += 6;

  // Quip (Salesforce)
  checkNewPage(60);
  doc.font(fonts.bold)
     .fontSize(10.5)
     .fillColor(colors.primary)
     .text('Quip (Salesforce)', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.muted)
     .text(' | Technical Lead / SRE | April 2019 – June 2021', { continued: false });
  y = doc.y + 4;

  const quipItems = [
    'Improved system reliability, increasing uptime by 15%; developed real-time clickstream analytics with AWS Kinesis, Lambda, Athena.',
    'Automated AWS infrastructure using Terraform and Ansible; migrated to AWS ECS, reducing costs by 20%.',
    'Designed zero-downtime AMI deployment process across AWS ECS Clusters.'
  ];

  quipItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(10)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 0.5 });
    y = doc.y + 3;
  });

  y += 6;

  // Oracle
  checkNewPage(60);
  doc.font(fonts.bold)
     .fontSize(10.5)
     .fillColor(colors.primary)
     .text('Oracle', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.muted)
     .text(' | Principal Systems Engineer | May 2016 – April 2019', { continued: false });
  y = doc.y + 4;

  const oracleItems = [
    'Developed CI/CD pipelines across Oracle Service Cloud; architected GitOps-based container deployment.',
    'Authored Terraform modules for OCI deployments; created microservices framework with HashiCorp Nomad/Consul.',
    'Implemented zero-downtime adaptive HA-Proxy load balancing using consul-templates.'
  ];

  oracleItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(10)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 0.5 });
    y = doc.y + 3;
  });

  y += 6;

  // Groupon
  checkNewPage(55);
  doc.font(fonts.bold)
     .fontSize(10.5)
     .fillColor(colors.primary)
     .text('Groupon', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.muted)
     .text(' | Senior Systems Engineer | September 2014 – May 2016', { continued: false });
  y = doc.y + 4;

  const grouponItems = [
    'Lead Engineer for datacenter hardware ingestion, CMDB, and OS bootstrapping; developed Docker provisioning with Jenkins/Ansible.',
    'Led Ansible adoption across the organization; mentored engineers in automation and configuration management.'
  ];

  grouponItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(10)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 0.5 });
    y = doc.y + 3;
  });

  y += 6;

  // LiveOps
  checkNewPage(50);
  doc.font(fonts.bold)
     .fontSize(10.5)
     .fillColor(colors.primary)
     .text('LiveOps', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.muted)
     .text(' | Senior Systems Administrator | April 2013 – September 2014', { continued: false });
  y = doc.y + 4;

  const liveopsItems = [
    'Lead for automation and storage virtualization; designed 600TB+ Netapp storage with Cisco Nexus networking (60Gbps/array).'
  ];

  liveopsItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(10)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 0.5 });
    y = doc.y + 3;
  });

  y += 6;

  // Telvue Corporation
  checkNewPage(50);
  doc.font(fonts.bold)
     .fontSize(10.5)
     .fillColor(colors.primary)
     .text('Telvue Corporation', doc.page.margins.left, y, { continued: true })
     .font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.muted)
     .text(' | Director of Network Operations | January 2012 – April 2013', { continued: false });
  y = doc.y + 4;

  const telvueItems = [
    'Directed network infrastructure upgrades for IPTV; engineered KVM virtualization; completed datacenter migration.'
  ];

  telvueItems.forEach(item => {
    doc.font(fonts.regular)
       .fontSize(10)
       .fillColor(colors.text)
       .text('• ' + item, doc.page.margins.left + 8, y, { width: pageWidth - 16, lineGap: 0.5 });
    y = doc.y + 3;
  });

  y += 6;

  // Earlier Experience
  checkNewPage(45);
  doc.font(fonts.bold)
     .fontSize(10)
     .fillColor(colors.accent)
     .text('Earlier Experience', doc.page.margins.left, y);
  y = doc.y + 4;

  doc.font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.text)
     .text('Continuum Health Alliance – UNIX System & Network Administrator (2008–2011)', doc.page.margins.left + 8, y);
  y = doc.y + 2;
  doc.text('Jones New York – Systems Engineer (2008) | Sage Software – Technical Analyst III (2005–2008)', doc.page.margins.left + 8, y);
  y = doc.y + 10;

  y = drawDivider(y);

  // ===== EDUCATION =====
  checkNewPage(45);
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('EDUCATION & PROFESSIONAL DEVELOPMENT', doc.page.margins.left, y);
  y = doc.y + 10;

  doc.font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.text)
     .text('Penn State University, Schuylkill Haven, PA (1999–2002)', doc.page.margins.left, y);
  y = doc.y + 3;

  doc.text('Emerge Global Executive Leadership Program, Ross School of Business, University of Michigan', doc.page.margins.left, y);
  y = doc.y + 10;

  y = drawDivider(y);

  // ===== HONORS & COMMUNITY =====
  checkNewPage(40);
  doc.font(fonts.bold)
     .fontSize(11)
     .fillColor(colors.primary)
     .text('HONORS & COMMUNITY', doc.page.margins.left, y);
  y = doc.y + 8;

  doc.font(fonts.regular)
     .fontSize(10)
     .fillColor(colors.text)
     .text('• LiveOps Amsterdam Datacenter Creation Award', doc.page.margins.left, y);
  y = doc.y + 3;

  doc.text('• AI with Friends – Co-host of weekly tech podcast', doc.page.margins.left, y);
  y = doc.y + 3;

  doc.text('• /Dev/Color – Active mentor promoting diversity in technology', doc.page.margins.left, y);

  // Finalize
  doc.end();

  stream.on('finish', () => {
    console.log('Resume PDF generated successfully at:', outputPath);
  });
}

createResume();

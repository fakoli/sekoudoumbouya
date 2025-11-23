---
title: "Data Platform Reliability & Analytics"
publishDate: 2025-11-22
description: "Improving uptime by 15% and building real-time analytics pipelines for Quip."
role: "Technical Lead – Data Platform SRE"
organization: "Quip (Salesforce)"
impactSummary: "Increased overall system uptime by 15% and enabled real-time insights via a new analytics pipeline."
scale: "High Availability, Real-Time Data"
primaryTech: ["AWS Kinesis", "Lambda", "Athena", "SRE"]
contributions:
  - "Improved system reliability, increasing overall uptime by 15%."
  - "Developed real-time clickstream analytics pipeline."
  - "Migrated applications to AWS ECS."
outcomes:
  - "15% increase in uptime."
  - "Real-time visibility into user behavior."
  - "20% reduction in operational costs via ECS migration."
featured: false
tags: ["SRE", "Data Engineering", "AWS", "Reliability"]
duration: "2020 - 2021"
---

# The Challenge

The Quip Data Platform was facing reliability issues that impacted the availability of critical business insights. Additionally, the existing analytics infrastructure was batch-based, preventing real-time analysis of user interactions.

# The Approach

As the Technical Lead for Data Platform SRE, I focused on two main areas: hardening the existing infrastructure and modernizing the data pipeline.

## Reliability Engineering
I led a reliability audit of the platform, identifying single points of failure and bottlenecks. We implemented better monitoring and alerting, and automated recovery processes.
- **Uptime:** These efforts resulted in a measurable 15% increase in overall system uptime.

## Real-Time Analytics
To enable real-time insights, I designed and built a new clickstream analytics pipeline.
- **Architecture:** We used AWS Kinesis for data ingestion, Lambda for serverless processing, and Athena for ad-hoc querying.
- **Impact:** This allowed product teams to see user behavior in real-time, enabling faster iteration.

# Key Contributions

- **Pipeline Development:** Wrote the core logic for the Kinesis/Lambda pipeline.
- **Cost Optimization:** Migrated legacy applications to AWS ECS, which reduced operational overhead and costs by 20%.
- **Infrastructure as Code:** Automated the provisioning of all new infrastructure using Terraform.

# Outcomes

- **Stability:** The platform became significantly more stable, reducing on-call burden.
- **Visibility:** The business gained new capabilities to understand user engagement as it happened.
- **Efficiency:** The move to ECS and serverless technologies lowered our run rate.

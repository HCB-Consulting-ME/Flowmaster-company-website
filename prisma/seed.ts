import "dotenv/config";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

// Get the database URL from environment
function getDbUrl() {
  const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
  // Convert relative path to absolute if needed
  if (dbUrl.startsWith("file:./")) {
    const relativePath = dbUrl.replace("file:./", "");
    const absolutePath = path.resolve(process.cwd(), relativePath);
    return `file:${absolutePath}`;
  }
  return dbUrl;
}

const url = getDbUrl();
console.log("Using database URL:", url);

const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed with LIVE WEBSITE DATA...\n");

  // ============================================
  // CLEAN ALL EXISTING DATA
  // ============================================
  console.log("Cleaning existing data...");
  await prisma.solution.deleteMany({});
  await prisma.industry.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.partnerBenefit.deleteMany({});
  await prisma.cultureValue.deleteMany({});
  await prisma.feature.deleteMany({});
  await prisma.solutionItem.deleteMany({});
  await prisma.challengeItem.deleteMany({});
  await prisma.timelineStep.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.pricingPlan.deleteMany({});
  await prisma.jobListing.deleteMany({});
  await prisma.officeLocation.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.pageContent.deleteMany({});
  console.log("✓ All existing data cleaned\n");

  // ============================================
  // ADMIN USER
  // ============================================
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@flow-master.ai" },
    update: { password: hashedPassword },
    create: {
      email: "admin@flow-master.ai",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log("✓ Admin user:", adminUser.email);

  // ============================================
  // SITE SETTINGS (from live site)
  // ============================================
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      companyName: "FlowMaster FZC LLC",
      copyrightYear: "2026",
      contactEmail: "contact@flow-master.ai",
      careersEmail: "careers@flow-master.ai",
      siteTitle: "FlowMaster | Enterprise-Ready AI Agents",
      siteDescription: "The Operating System for AI Native Enterprises. End-to-end orchestration and execution across systems and data landscapes.",
      siteUrl: "https://flow-master.ai",
      ogImage: "/Logo/image.png",
      favicon: "/Logo/logoicon2.png",
      logoImage: "/Logo/newLogo.png",
    },
    create: {
      id: "main",
      companyName: "FlowMaster FZC LLC",
      copyrightYear: "2026",
      contactEmail: "contact@flow-master.ai",
      careersEmail: "careers@flow-master.ai",
      siteTitle: "FlowMaster | Enterprise-Ready AI Agents",
      siteDescription: "The Operating System for AI Native Enterprises. End-to-end orchestration and execution across systems and data landscapes.",
      siteUrl: "https://flow-master.ai",
      ogImage: "/Logo/image.png",
      favicon: "/Logo/logoicon2.png",
      logoImage: "/Logo/newLogo.png",
    },
  });
  console.log("✓ Site settings configured");

  // ============================================
  // TEAM MEMBERS (from live site: /company)
  // ============================================
  const teamMembers = [
    {
      id: "benjamin-hippler",
      name: "Benjamin Hippler",
      role: "CEO & Founder",
      image: "/Company/ben.png",
      order: 1,
      isActive: true,
    },
    {
      id: "muhammad-irtiza",
      name: "Muhammad Irtiza",
      role: "CTO & Co-Founder",
      image: "/Company/irtiza.png",
      order: 2,
      isActive: true,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member });
  }
  console.log("✓ Team members: 2 members added");

  // ============================================
  // OFFICE LOCATIONS (from live site: /contact-us)
  // ============================================
  const locations = [
    {
      id: "dubai",
      name: "Head Office - Dubai",
      city: "Ajman",
      country: "UAE",
      countryCode: "AE",
      address: "Ajman, UAE",
      isHeadquarters: true,
      order: 1,
      isActive: true,
    },
    {
      id: "karachi",
      name: "Global Delivery Center - Karachi",
      city: "Karachi",
      country: "Pakistan",
      countryCode: "PK",
      address: "Karachi, PK",
      isHeadquarters: false,
      order: 2,
      isActive: true,
    },
    {
      id: "frankfurt",
      name: "Innovation Center - Frankfurt",
      city: "Frankfurt",
      country: "Germany",
      countryCode: "DE",
      address: "Frankfurt, DE",
      isHeadquarters: false,
      order: 3,
      isActive: true,
    },
  ];

  for (const location of locations) {
    await prisma.officeLocation.create({ data: location });
  }
  console.log("✓ Office locations: 3 locations added");

  // ============================================
  // JOB LISTINGS (from live site: /careers)
  // ============================================
  const jobs = [
    {
      id: "ai-engineering-architect",
      title: "AI Engineering Architect",
      department: "Product & Engineering",
      location: "Karachi, Pakistan",
      description: "The AI Engineering Architect designs and builds the AI-native SDLC toolset used by software developers. The role owns the full software lifecycle — from requirements and solution design through coding, testing, deployment, and operation. We develop with Claude Code.",
      scope: JSON.stringify([
        "Requirements intake and decomposition",
        "Architecture and design workflows",
        "AI-assisted coding, testing, and review",
        "CI/CD, deployment, and application operations",
        "Build and maintain the developer toolset (Claude Code workflows, MCPs, Skills, Hooks, slash-commands) and prompts",
        "E2E integration and automation of the SDLC across stages into a single, traceable workflow",
        "Define and enforce standards through tooling, not documentation",
        "Ensure adoption of the toolset (incl training and communication)",
      ]),
      skills: JSON.stringify([
        "Expert level experience with Claude Code (non-negotiable), MCPs, Skills, prompting",
        "End-to-End understanding of the SDLC from requirements to maintenance and beyond",
        "Solid experience in SW-Architecture, Testing and CI/CD",
      ]),
      isActive: true,
    },
  ];

  for (const job of jobs) {
    await prisma.jobListing.create({ data: job });
  }
  console.log("✓ Job listings: 1 position added");

  // ============================================
  // CULTURE VALUES (from live site: /careers)
  // ============================================
  const cultureValues = [
    {
      id: "innovation",
      title: "Innovation",
      description: "Endorse, innovation and collaborative recruiting for the AI age.",
      icon: "Lightbulb",
      order: 1,
      isActive: true,
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description: "Collaboration in the networks, and work for innovation across borders.",
      icon: "Users",
      order: 2,
      isActive: true,
    },
    {
      id: "impact",
      title: "Impact",
      description: "Impact with real business results and shared resources.",
      icon: "Zap",
      order: 3,
      isActive: true,
    },
    {
      id: "growth",
      title: "Growth",
      description: "Growth and organizing AI to convene and promote personal growth.",
      icon: "TrendingUp",
      order: 4,
      isActive: true,
    },
  ];

  for (const value of cultureValues) {
    await prisma.cultureValue.create({ data: value });
  }
  console.log("✓ Culture values: 4 values added");

  // ============================================
  // PARTNER BENEFITS (from live site: /partners)
  // ============================================
  const partnerBenefits = [
    {
      id: "technology-access",
      title: "Access to Technology",
      description: "Exclusive access to our AI Agent core, roadmap updates, and beta features.",
      icon: "Lightbulb",
      order: 1,
      isActive: true,
    },
    {
      id: "co-marketing",
      title: "Co-Marketing Opportunities",
      description: "Joint webinars, case studies, and featuring in our global partner directory.",
      icon: "Handshake",
      order: 2,
      isActive: true,
    },
    {
      id: "dedicated-support",
      title: "Dedicated Support",
      description: "Priority technical support and a dedicated channel for solution architecture.",
      icon: "Headphones",
      order: 3,
      isActive: true,
    },
    {
      id: "revenue-share",
      title: "Revenue Share",
      description: "Competitive referral fees and co-sell incentives to grow your bottom line.",
      icon: "DollarSign",
      order: 4,
      isActive: true,
    },
  ];

  for (const benefit of partnerBenefits) {
    await prisma.partnerBenefit.create({ data: benefit });
  }
  console.log("✓ Partner benefits: 4 benefits added");

  // ============================================
  // FEATURES (from live site: homepage)
  // ============================================
  const features = [
    {
      id: "integration",
      title: "Integration",
      description: "FlowMasterSDX technology makes existing data structures across the enterprise usable for Agents. Enables seamless AI deployment across organizational data silos.",
      icon: "Plug",
      order: 1,
      isActive: true,
    },
    {
      id: "process-design",
      title: "Process Design",
      description: "Bring your own processes: Upload as PDF and modify via drag-and-drop editor with full versioning and approvals.",
      icon: "PenTool",
      order: 2,
      isActive: true,
    },
    {
      id: "process-execution",
      title: "Process Execution",
      description: "Self-learning agents execute with oversight. No black boxes, full audit trail, and human-in-the-loop controls.",
      icon: "Play",
      order: 3,
      isActive: true,
    },
    {
      id: "user-experience",
      title: "User Experience",
      description: "Connect to existing front-end applications or use FlowMasterDXG platform for rapid generation of mobile and web user interfaces.",
      icon: "Monitor",
      order: 4,
      isActive: true,
    },
    {
      id: "security-privacy",
      title: "Security & Privacy",
      description: "Available in both SaaS and self-hosted deployment options. Supports multiple LLMs while maintaining maximum data control.",
      icon: "Shield",
      order: 5,
      isActive: true,
    },
    {
      id: "business-as-code",
      title: "Business-as-Code (BaC)",
      description: "Integrates analysis, design, sign-off, and execution within a single platform. Enables deployment of changes as code for enterprise agility.",
      icon: "Code",
      order: 6,
      isActive: true,
    },
  ];

  for (const feature of features) {
    await prisma.feature.create({ data: feature });
  }
  console.log("✓ Features: 6 features added");

  // ============================================
  // TIMELINE STEPS (from live site: /platform)
  // ============================================
  const timelineSteps = [
    {
      id: "process-ingestion",
      title: "Process Ingestion",
      description: "Ingest SOPs, RACIs, and existing process documentation into the local secure fabric.",
      role: "Process Architect",
      icon: "FileInput",
      order: 1,
      isActive: true,
    },
    {
      id: "sdx-intelligence",
      title: "SDX Intelligence",
      description: "Maps processes to enterprise data with contextual awareness.",
      role: "AI Agents & Bots",
      icon: "Brain",
      order: 2,
      isActive: true,
    },
    {
      id: "agent-assembly",
      title: "Agent Assembly",
      description: "No-code orchestration of autonomous agents and human task handover.",
      role: "Execution Engine",
      icon: "Blocks",
      order: 3,
      isActive: true,
    },
    {
      id: "live-execution",
      title: "Live Execution",
      description: "Continuous monitoring and secure execution across core systems.",
      role: "Platform Admin",
      icon: "Activity",
      order: 4,
      isActive: true,
    },
  ];

  for (const step of timelineSteps) {
    await prisma.timelineStep.create({ data: step });
  }
  console.log("✓ Timeline steps: 4 steps added");

  // ============================================
  // INDUSTRIES (from live site: /solutions)
  // ============================================
  const industries = [
    { id: "banking", name: "Banking & Finance", slug: "banking", icon: "Landmark", order: 1, isActive: true },
    { id: "telecom", name: "Telecom & Tech", slug: "telecom", icon: "RadioTower", order: 2, isActive: true },
    { id: "energy", name: "Energy & Utilities", slug: "energy", icon: "Zap", order: 3, isActive: true },
    { id: "gov", name: "Government", slug: "gov", icon: "Building2", order: 4, isActive: true },
    { id: "logistics", name: "Logistics & Cargo", slug: "logistics", icon: "Truck", order: 5, isActive: true },
  ];

  for (const industry of industries) {
    await prisma.industry.create({ data: industry });
  }
  console.log("✓ Industries: 5 industries added");

  // ============================================
  // SOLUTIONS (from live site: /solutions)
  // ============================================
  const solutions = [
    // Banking & Finance (6 solutions from live site)
    {
      id: "banking-merchant-onboarding",
      title: "Merchant Onboarding",
      description: "FlowMaster orchestrates end-to-end data intake, automated validation, and risk routing. Solves long onboarding cycles and manual KYC/KYB checks.",
      icon: "UserPlus",
      industryId: "banking",
      order: 1,
      isActive: true,
    },
    {
      id: "banking-pricing-deal",
      title: "Pricing & Deal Execution",
      description: "Turns pricing into an executable process with enforced approval thresholds. Eliminates custom pricing errors and spreadsheet-based approvals.",
      icon: "Banknote",
      industryId: "banking",
      order: 2,
      isActive: true,
    },
    {
      id: "banking-settlement",
      title: "Settlement & Reconciliation",
      description: "FlowMaster runs reconciliation as a managed process with AI-driven classification of anomalies. Addresses daily mismatches and manual investigations.",
      icon: "Gavel",
      industryId: "banking",
      order: 3,
      isActive: true,
    },
    {
      id: "banking-regulatory",
      title: "Regulatory Reporting",
      description: "Reports are generated directly from execution logs, providing a clear audit trail. Eliminates ad-hoc data pulls and manual reporting stress.",
      icon: "FileText",
      industryId: "banking",
      order: 4,
      isActive: true,
    },
    {
      id: "banking-crossborder",
      title: "Cross-Border Operations",
      description: "One logical process with country-specific rulesets while maintaining a single operational view. Solves inconsistent execution across countries.",
      icon: "Globe",
      industryId: "banking",
      order: 5,
      isActive: true,
    },
    {
      id: "banking-incident",
      title: "Incident & Issue Resolution",
      description: "Coordinates capture, triage, and root cause analysis with automated resolution tracking. Addresses payment failures and unclear ownership.",
      icon: "Activity",
      industryId: "banking",
      order: 6,
      isActive: true,
    },
    // Telecom & Tech (2 solutions)
    {
      id: "telecom-provisioning",
      title: "Network Provisioning",
      description: "Automated orchestration of hardware and software provisioning workflows for rapid deployment.",
      icon: "RadioTower",
      industryId: "telecom",
      order: 1,
      isActive: true,
    },
    {
      id: "telecom-sla",
      title: "SLA Compliance Tracking",
      description: "Continuous monitoring with automated alerts and penalty calculations for contractual accuracy.",
      icon: "ShieldCheck",
      industryId: "telecom",
      order: 2,
      isActive: true,
    },
    // Energy & Utilities (2 solutions)
    {
      id: "energy-maintenance",
      title: "Grid Maintenance",
      description: "Predictive maintenance workflows triggered by AI sensor data analysis for enhanced uptime.",
      icon: "Zap",
      industryId: "energy",
      order: 1,
      isActive: true,
    },
    {
      id: "energy-renewable",
      title: "Renewable Integration",
      description: "Orchestrates dynamic load balancing between traditional and renewable sources for grid stability.",
      icon: "Activity",
      industryId: "energy",
      order: 2,
      isActive: true,
    },
    // Government (2 solutions)
    {
      id: "gov-permit",
      title: "Permit Processing",
      description: "Unified digital workflow for intake, cross-agency review, and automated approval to reduce wait times.",
      icon: "FileText",
      industryId: "gov",
      order: 1,
      isActive: true,
    },
    {
      id: "gov-safety",
      title: "Public Safety Response",
      description: "FlowMaster acts as an Ops Control Tower for multi-agency emergency response with calmer operations.",
      icon: "ShieldCheck",
      industryId: "gov",
      order: 2,
      isActive: true,
    },
    // Logistics & Cargo (6 solutions)
    {
      id: "logistics-shipment",
      title: "Shipment Acceptance",
      description: "Orchestrates booking verification and automated document validation for SLA performance.",
      icon: "Truck",
      industryId: "logistics",
      order: 1,
      isActive: true,
    },
    {
      id: "logistics-warehouse",
      title: "Warehouse Operations",
      description: "Manages workflows for location assignment, movement tracking, and storage billing for inventory visibility.",
      icon: "ClipboardList",
      industryId: "logistics",
      order: 2,
      isActive: true,
    },
    {
      id: "logistics-uld",
      title: "ULD Build-Up & Breakdown",
      description: "Coordinates build-up as a managed process with automated constraint enforcement for faster turnaround.",
      icon: "Package",
      industryId: "logistics",
      order: 3,
      isActive: true,
    },
    {
      id: "logistics-special-cargo",
      title: "Special Cargo Handling",
      description: "Enforces handling instructions and temperature logging with AI-flagging of deviations for cargo integrity.",
      icon: "Thermometer",
      industryId: "logistics",
      order: 4,
      isActive: true,
    },
    {
      id: "logistics-booking",
      title: "Booking & Capacity",
      description: "Orchestrates the booking workflow with real-time capacity and rate application for optimized load factors.",
      icon: "Server",
      industryId: "logistics",
      order: 5,
      isActive: true,
    },
    {
      id: "logistics-irregularity",
      title: "Flight Irregularity",
      description: "Structured recovery workflow with priority-based rebooking suggestions for faster recovery.",
      icon: "Plane",
      industryId: "logistics",
      order: 6,
      isActive: true,
    },
  ];

  for (const solution of solutions) {
    await prisma.solution.create({ data: solution });
  }
  console.log("✓ Solutions: 18 solutions added");

  // ============================================
  // PRICING PLANS (from live site: /pricing)
  // ============================================
  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      subtitle: "For individuals & prototyping",
      price: "$0",
      period: "month",
      badge: "Current Plan",
      features: JSON.stringify([]),
      specs: JSON.stringify([
        { label: "CPU", value: "AMD Ryzen™ 5 3600 (6c/12t)" },
        { label: "Generation", value: "Matisse (Zen 2)" },
        { label: "RAM", value: "128 GB DDR4 RAM" },
        { label: "Drives", value: "2 x 512 GB NVMe SSD" },
        { label: "Locations", value: "1 x Germany, 1 x Finland" },
      ]),
      ctaText: "Join the Waitlist",
      ctaLink: "/contact-us",
      order: 1,
      isPopular: false,
      isHighlighted: false,
      isActive: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "Customized for scale & security",
      price: "Custom",
      period: "",
      badge: "Recommended",
      features: JSON.stringify([
        { label: "Process executions", value: "Unlimited", type: "bold" },
        { label: "Number of agents", value: "Unlimited", type: "bold" },
        { label: "MCP servers", value: "Unlimited", type: "bold" },
        { label: "Integrations", value: "Unlimited", type: "bold" },
        { label: "On-Prem usage", value: "Included (client hosted)", type: "italic" },
        { label: "SaaS based usage", value: "Included (client hosted)", type: "italic" },
        { label: "Single Sign On", value: "Included", type: "green" },
        { label: "Audit", value: "Included", type: "green" },
      ]),
      specs: JSON.stringify([
        { label: "Token Usage", value: "250M token usage p.a. in Gemini 3 Flash (approx. 200M words)" },
      ]),
      ctaText: "Join the Waitlist",
      ctaLink: "/contact-us",
      order: 2,
      isPopular: true,
      isHighlighted: true,
      isActive: true,
    },
  ];

  for (const plan of pricingPlans) {
    await prisma.pricingPlan.create({ data: plan });
  }
  console.log("✓ Pricing plans: 2 plans added");

  // ============================================
  // SUMMARY
  // ============================================
  console.log("\n========================================");
  console.log("DATABASE SEEDED WITH LIVE WEBSITE DATA");
  console.log("========================================");
  console.log("Data Source: https://flow-master.ai");
  console.log("");
  console.log("Summary:");
  console.log("  • Team Members: 2");
  console.log("  • Office Locations: 3");
  console.log("  • Job Listings: 1");
  console.log("  • Culture Values: 4");
  console.log("  • Partner Benefits: 4");
  console.log("  • Features: 6");
  console.log("  • Timeline Steps: 4");
  console.log("  • Industries: 5");
  console.log("  • Solutions: 18");
  console.log("  • Pricing Plans: 2");
  console.log("");
  console.log("--- Admin Login Credentials ---");
  console.log("Email: admin@flow-master.ai");
  console.log("Password: admin123");
  console.log("--------------------------------\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

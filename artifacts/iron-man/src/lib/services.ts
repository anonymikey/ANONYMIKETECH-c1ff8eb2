export type ServiceSlug =
  | "web-development"
  | "ai-automation"
  | "chatbots"
  | "internet-solutions"
  | "cloud-vps"
  | "digital-design"
  | "custom-software";

export type ServiceDefinition = {
  slug: ServiceSlug;
  code: string;
  name: string;
  tagline: string;
  description: string;
  eyebrow: string;
  /** Which frame sequence to use: "hero" = /frames/, "cinematic" = /frames2/ */
  frameSet: "hero" | "cinematic";
  capabilities: string[];
  technology: string[];
  ctaLabel: string;
  statusLabel: string;
};

export const SERVICES: Record<ServiceSlug, ServiceDefinition> = {
  "web-development": {
    slug: "web-development",
    code: "01",
    name: "WEB DEVELOPMENT",
    tagline: "Build intelligent digital experiences.",
    description:
      "Modern websites, dashboards, applications and custom platforms designed for performance, clarity and impact.",
    eyebrow: "MODULE // 01",
    frameSet: "hero",
    capabilities: [
      "Corporate Websites",
      "Web Applications",
      "Dashboards",
      "E-commerce Platforms",
      "Custom Platforms",
      "Responsive Interfaces",
    ],
    technology: [
      "React",
      "TypeScript",
      "Vite",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
    ],
    ctaLabel: "START WEB PROJECT",
    statusLabel: "ACTIVE // DEPLOYING",
  },
  "ai-automation": {
    slug: "ai-automation",
    code: "02",
    name: "AI & AUTOMATION",
    tagline: "Intelligence that moves at the speed of intent.",
    description:
      "AI agents, intelligent workflows, integrations and business automation built for the systems that matter.",
    eyebrow: "MODULE // 02",
    frameSet: "cinematic",
    capabilities: [
      "AI Agents",
      "Intelligent Workflows",
      "API Integrations",
      "Business Automation",
      "AI Assistants",
      "Data Processing",
    ],
    technology: [
      "AI SDK",
      "OpenAI",
      "LangChain",
      "Python",
      "APIs",
      "Webhooks",
    ],
    ctaLabel: "BUILD AI SYSTEM",
    statusLabel: "ACTIVE // LEARNING",
  },
  chatbots: {
    slug: "chatbots",
    code: "03",
    name: "CHATBOTS",
    tagline: "Automated conversations that feel intentional.",
    description:
      "WhatsApp bots, customer support automation and conversational systems designed for real interaction.",
    eyebrow: "MODULE // 03",
    frameSet: "hero",
    capabilities: [
      "WhatsApp Bots",
      "Customer Support Automation",
      "Conversational Systems",
      "Lead Qualification",
      "Multi-language Bots",
      "API Chatbots",
    ],
    technology: [
      "Conversational AI",
      "WhatsApp API",
      "Webhooks",
      "NLP",
      "Node.js",
      "REST APIs",
    ],
    ctaLabel: "AUTOMATE MY BUSINESS",
    statusLabel: "ACTIVE // ONLINE",
  },
  "internet-solutions": {
    slug: "internet-solutions",
    code: "04",
    name: "INTERNET SOLUTIONS",
    tagline: "Connected infrastructure with a human signal.",
    description:
      "WiFi deployment, ISP systems, VPN and connectivity architecture for networks that stay clear under pressure.",
    eyebrow: "MODULE // 04",
    frameSet: "cinematic",
    capabilities: [
      "WiFi Deployment",
      "ISP Systems",
      "VPN Architecture",
      "Network Design",
      "Connectivity Solutions",
      "Security Infrastructure",
    ],
    technology: [
      "Networks",
      "Security",
      "VPN",
      "Linux",
      "Firewalls",
      "Monitoring",
    ],
    ctaLabel: "REQUEST INTERNET SOLUTION",
    statusLabel: "ACTIVE // CONNECTED",
  },
  "cloud-vps": {
    slug: "cloud-vps",
    code: "05",
    name: "CLOUD & VPS",
    tagline: "Infrastructure that scales with your ambition.",
    description:
      "Hosting, infrastructure, server management and deployment systems built for reliability and performance.",
    eyebrow: "MODULE // 05",
    frameSet: "hero",
    capabilities: [
      "Cloud Hosting",
      "VPS Management",
      "Server Administration",
      "Deployment Systems",
      "Container Orchestration",
      "Auto-scaling",
    ],
    technology: [
      "Linux",
      "Docker",
      "Cloud",
      "Kubernetes",
      "CI/CD",
      "Monitoring",
    ],
    ctaLabel: "DEPLOY CLOUD INFRASTRUCTURE",
    statusLabel: "ACTIVE // SCALING",
  },
  "digital-design": {
    slug: "digital-design",
    code: "06",
    name: "DIGITAL DESIGN",
    tagline: "Visual systems that speak before words.",
    description:
      "Brand identity, UI systems, promotional graphics and digital experiences crafted with precision.",
    eyebrow: "MODULE // 06",
    frameSet: "cinematic",
    capabilities: [
      "Brand Identity",
      "UI/UX Design",
      "Promotional Graphics",
      "Digital Experiences",
      "Motion Design",
      "Design Systems",
    ],
    technology: [
      "Figma",
      "UI Systems",
      "Motion",
      "Prototyping",
      "Design Tokens",
      "Accessibility",
    ],
    ctaLabel: "START DESIGN PROJECT",
    statusLabel: "ACTIVE // CREATING",
  },
  "custom-software": {
    slug: "custom-software",
    code: "07",
    name: "CUSTOM SOFTWARE",
    tagline: "Built around the way your team works.",
    description:
      "Specialized business platforms built around the way your team works — from data pipelines to full-stack systems.",
    eyebrow: "MODULE // 07",
    frameSet: "cinematic",
    capabilities: [
      "Business Platforms",
      "Data Pipelines",
      "Full-stack Applications",
      "System Integration",
      "Custom Dashboards",
      "API Development",
    ],
    technology: [
      "Full-stack",
      "Data",
      "Integrations",
      "TypeScript",
      "PostgreSQL",
      "REST/GraphQL",
    ],
    ctaLabel: "BUILD CUSTOM SOFTWARE",
    statusLabel: "ACTIVE // ENGINEERING",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES) as ServiceSlug[];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES[slug as ServiceSlug];
}

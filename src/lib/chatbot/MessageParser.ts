// src/lib/chatbot/MessageParser.ts
import { FAQ_HERO } from "@/config/faqs";
import type { ActionProviderShape } from "./chatbot.types";

function normText(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokensOf(s: string) {
  return normText(s).split(" ").filter(Boolean);
}

function hasAnyToken(tokens: string[], candidates: readonly string[]) {
  const set = new Set(tokens);
  return candidates.some((candidate) => set.has(candidate));
}

/** Normalized message contains normalized phrase as a contiguous substring (word boundaries not enforced). */
function normIncludes(message: string, phrase: string) {
  const n = normText(message);
  const p = normText(phrase);
  return p.length > 0 && n.includes(p);
}

export default class MessageParser {
  private actionProvider: ActionProviderShape;

  constructor(actionProvider: ActionProviderShape) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const tokens = tokensOf(message);

    if (
      hasAnyToken(tokens, ["quote", "quotes", "pricing", "price", "rate", "rates", "cost", "costs"])
    ) {
      return this.actionProvider.startQuote();
    }

    if (this.actionProvider.tryAnswerFaq(message)) return;

    if (
      hasAnyToken(tokens, ["track", "tracking", "status"]) ||
      (hasAnyToken(tokens, ["where", "wheres"]) &&
        hasAnyToken(tokens, [
          "shipment",
          "shipments",
          "load",
          "loads",
          "freight",
          "delivery",
          "deliveries",
          "number",
        ]))
    ) {
      return this.actionProvider.startTracking();
    }

    if (
      hasAnyToken(tokens, ["driver", "drivers", "drivedock", "cdl", "otr"]) ||
      (hasAnyToken(tokens, ["fleet", "owner", "operator"]) &&
        !hasAnyToken(tokens, ["office", "sales", "account"]))
    ) {
      return this.actionProvider.suggestNavPage(
        "Driver Opportunities",
        "/careers#drive",
        "Digital onboarding through DriveDock, qualification standards, and growth pathways for fleet professionals.",
      );
    }

    if (
      hasAnyToken(tokens, [
        "career",
        "careers",
        "job",
        "jobs",
        "hiring",
        "apply",
        "resume",
        "employment",
      ])
    ) {
      return this.actionProvider.showCareers();
    }

    if (
      hasAnyToken(tokens, ["industry", "industries", "sector", "sectors", "vertical"]) ||
      hasAnyToken(tokens, [
        "automotive",
        "manufacturing",
        "construction",
        "steel",
        "chemical",
        "plastics",
      ])
    ) {
      return this.actionProvider.showIndustries();
    }

    if (
      hasAnyToken(tokens, [
        "insight",
        "insights",
        "blog",
        "article",
        "articles",
        "news",
        "post",
        "posts",
      ]) ||
      hasAnyToken(tokens, ["guide", "guides"])
    ) {
      return this.actionProvider.suggestNavPage(
        "Insights",
        "/insights",
        "Articles and operational perspectives from SSP Group.",
      );
    }

    if (hasAnyToken(tokens, ["faq", "faqs"])) {
      return this.actionProvider.suggestNavPage("FAQs", "/company/faqs", FAQ_HERO.subtitle);
    }

    if (hasAnyToken(tokens, ["media", "video", "videos", "footage"])) {
      return this.actionProvider.suggestNavPage(
        "Media",
        "/company/media",
        "Operations footage, brand media, and video highlights.",
      );
    }

    if (hasAnyToken(tokens, ["history", "milestone", "milestones", "founded"])) {
      return this.actionProvider.suggestNavPage(
        "Our History",
        "/company/our-history",
        "Milestones that shaped SSP's operating model and scale.",
      );
    }

    if (hasAnyToken(tokens, ["lane", "lanes", "corridor", "corridors"])) {
      return this.actionProvider.suggestNavPage(
        "Lanes",
        "/lanes",
        "Explore lane-level freight context across the SSP network.",
      );
    }

    if (
      hasAnyToken(tokens, [
        "location",
        "locations",
        "office",
        "offices",
        "address",
        "addresses",
        "headquarters",
        "hq",
      ]) &&
      (hasAnyToken(tokens, ["ssp", "you", "your", "company", "based", "located", "network"]) ||
        normIncludes(message, "where are you"))
    ) {
      return this.actionProvider.suggestNavPage(
        "Locations & Network",
        "/about-us#locations-network",
        "North American office footprint and operating coverage across Canada, the United States, and Mexico.",
      );
    }

    if (
      hasAnyToken(tokens, ["about", "company", "mission", "vision", "values", "leadership"]) ||
      normIncludes(message, "who is ssp")
    ) {
      return this.actionProvider.showCompany();
    }

    if (
      hasAnyToken(tokens, [
        "safety",
        "compliance",
        "regulated",
        "regulations",
        "documentation",
        "audit",
      ])
    ) {
      return this.actionProvider.suggestNavPage(
        "Safety & Compliance",
        "/company/safety-compliance",
        "Compliance governance and risk controls across active freight programs.",
      );
    }

    if (hasAnyToken(tokens, ["resource", "resources"])) {
      return this.actionProvider.showResources();
    }

    if (hasAnyToken(tokens, ["question", "questions"])) {
      return this.actionProvider.suggestNavPage("FAQs", "/company/faqs", FAQ_HERO.subtitle);
    }

    if (
      hasAnyToken(tokens, [
        "why",
        "reliable",
        "reliability",
        "ontime",
        "on-time",
        "choose",
        "different",
      ]) ||
      normIncludes(message, "why ssp")
    ) {
      return this.actionProvider.showWhySsp();
    }

    if (
      hasAnyToken(tokens, [
        "contact",
        "email",
        "support",
        "agent",
        "phone",
        "call",
        "reach",
        "representative",
      ]) ||
      normIncludes(message, "live chat") ||
      normIncludes(message, "live agent")
    ) {
      return this.actionProvider.showContact();
    }

    if (
      hasAnyToken(tokens, ["solution", "solutions", "service", "services", "freight", "shipping"])
    ) {
      return this.actionProvider.startSolutions();
    }

    if (tokens.includes("ltl")) {
      return this.actionProvider.suggestNavPage(
        "Less-Than-Truckload (LTL)",
        "/solutions/ltl",
        "Cost-efficient LTL shipping across shared lane networks.",
      );
    }

    if (tokens.includes("truckload") || tokens.includes("tl") || tokens.includes("ftl")) {
      return this.actionProvider.suggestNavPage(
        "Full Truckload",
        "/solutions/truckload",
        "Full truckload shipping for high-control lanes.",
      );
    }

    if (tokens.includes("dry") && tokens.includes("van")) {
      return this.actionProvider.suggestNavPage(
        "Dry Van",
        "/solutions/dry-van",
        "Enclosed freight coverage with stable transit discipline.",
      );
    }

    if (tokens.includes("flatbed") || (tokens.includes("flat") && tokens.includes("bed"))) {
      if (hasAnyToken(tokens, ["step"])) {
        return this.actionProvider.suggestNavPage(
          "Step Deck",
          "/solutions/step-deck",
          "Drop-deck geometry for taller freight profiles.",
        );
      }
      return this.actionProvider.suggestNavPage(
        "Flatbed",
        "/solutions/flatbed",
        "Open-deck freight for industrial and construction cargo.",
      );
    }

    if (hasAnyToken(tokens, ["conestoga", "roll", "tite", "rolltite"])) {
      return this.actionProvider.suggestNavPage(
        "Conestoga / Roll-Tite",
        "/solutions/conestoga-roll-tite",
        "Covered deck protection without sacrificing loading flexibility.",
      );
    }

    if (hasAnyToken(tokens, ["rgn", "heavy", "haul", "oversize", "overweight"])) {
      return this.actionProvider.suggestNavPage(
        "RGN / Heavy Haul",
        "/solutions/rgn-heavy-haul",
        "Permit-aware movement for oversize and heavy units.",
      );
    }

    if (hasAnyToken(tokens, ["expedite", "expedited", "rush", "hotshot", "urgent"])) {
      return this.actionProvider.suggestNavPage(
        "Expedited",
        "/solutions/expedited",
        "Priority execution for time-critical shipments.",
      );
    }

    if (
      hasAnyToken(tokens, ["specialized", "vehicle", "vehicles"]) ||
      normIncludes(message, "car hauling")
    ) {
      return this.actionProvider.suggestNavPage(
        "Specialized Vehicles Transport",
        "/solutions/specialized-vehicles",
        "Specialized equipment programs matched to cargo constraints.",
      );
    }

    if (
      hasAnyToken(tokens, ["project"]) &&
      hasAnyToken(tokens, ["freight", "cargo", "move", "phase"])
    ) {
      return this.actionProvider.suggestNavPage(
        "Project Freight",
        "/solutions/project-freight",
        "Program-managed freight for complex and phased moves.",
      );
    }

    if (hasAnyToken(tokens, ["hazmat", "hazardous", "tdg"])) {
      return this.actionProvider.suggestNavPage(
        "Hazmat",
        "/solutions/hazmat",
        "Compliant hazmat movement and documentation controls.",
      );
    }

    if (hasAnyToken(tokens, ["temperature", "reefer", "cold", "refrigerated", "frozen"])) {
      return this.actionProvider.suggestNavPage(
        "Temperature-Controlled",
        "/solutions/temperature-controlled",
        "Refrigerated and controlled-temperature freight.",
      );
    }

    if (
      hasAnyToken(tokens, ["cross", "border", "customs", "pedimento", "broker", "importer"]) ||
      normIncludes(message, "cross border")
    ) {
      return this.actionProvider.suggestNavPage(
        "Cross-Border & Global",
        "/solutions/cross-border",
        "North American cross-border planning, compliance, and execution.",
      );
    }

    if (
      (tokens.includes("air") && hasAnyToken(tokens, ["freight", "cargo"])) ||
      normIncludes(message, "air freight")
    ) {
      return this.actionProvider.suggestNavPage(
        "Air Freight",
        "/solutions/cross-border/air-freight",
        "Time-critical air freight for urgent cross-border shipments.",
      );
    }

    if (hasAnyToken(tokens, ["ocean", "container"]) || normIncludes(message, "ocean freight")) {
      return this.actionProvider.suggestNavPage(
        "Ocean Freight",
        "/solutions/cross-border/ocean-freight",
        "Managed ocean programs with inland cross-border distribution.",
      );
    }

    if (hasAnyToken(tokens, ["managed"]) && hasAnyToken(tokens, ["capacity"])) {
      return this.actionProvider.suggestNavPage(
        "Managed Capacity",
        "/solutions/managed-capacity",
        "Elastic capacity strategy for volatile lane demand.",
      );
    }

    if (hasAnyToken(tokens, ["dedicated", "contract"]) || hasAnyToken(tokens, ["sla"])) {
      return this.actionProvider.suggestNavPage(
        "Dedicated / Contract",
        "/solutions/dedicated-contract",
        "Dedicated fleet programs structured around SLAs.",
      );
    }

    if (
      hasAnyToken(tokens, ["warehouse", "warehousing", "distribution", "storage"]) ||
      tokens.includes("3pl")
    ) {
      return this.actionProvider.suggestNavPage(
        "Warehousing & Distribution",
        "/solutions/warehousing-distribution",
        "Storage, handling, and distribution orchestration.",
      );
    }

    const suggested = this.actionProvider.suggestNavOptions(message, { limit: 3 });
    if (suggested) return;

    return this.actionProvider.searchFaq(message);
  }
}

// src/lib/chatbot/MessageParser.ts
import { FAQ_HERO, FAQ_PAGE_ROUTES } from "@/config/faqs";
import { getSolutionNavSuggestion } from "./navIndex";
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

  /** Uses labels and descriptions from `navigation.ts` via `getSolutionNavSuggestion`. */
  private trySuggestSolution(href: string): boolean {
    const s = getSolutionNavSuggestion(href);
    if (!s) return false;
    this.actionProvider.suggestNavPage(s.label, s.href, s.description);
    return true;
  }

  parse(message: string) {
    if (this.actionProvider.isQuoteIntakeActive()) {
      this.actionProvider.handleQuoteIntakeUserMessage(message);
      return;
    }

    const tokens = tokensOf(message);

    if (
      hasAnyToken(tokens, ["quote", "quotes", "pricing", "price", "rate", "rates", "cost", "costs"])
    ) {
      return this.actionProvider.startQuote();
    }

    if (this.actionProvider.tryAnswerFaq(message)) return;

    if (
      (hasAnyToken(tokens, ["track", "tracking", "status"]) &&
        !hasAnyToken(tokens, ["cookie", "cookies", "consent", "pixel", "analytics"])) ||
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
        "retail",
        "consumer",
        "food",
        "beverage",
        "construction",
        "steel",
        "aluminum",
        "metals",
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
      return this.actionProvider.suggestNavPage("FAQs", FAQ_PAGE_ROUTES.faqs, FAQ_HERO.subtitle);
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
      hasAnyToken(tokens, ["location", "locations", "city", "cities", "terminal", "terminals"]) &&
      (hasAnyToken(tokens, ["freight", "service", "services", "coverage", "network"]) ||
        normIncludes(message, "freight by location"))
    ) {
      return this.actionProvider.suggestNavPage(
        "Freight by location",
        "/locations",
        "Browse SSP locations and regional freight coverage.",
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
      return this.actionProvider.suggestNavPage("FAQs", FAQ_PAGE_ROUTES.faqs, FAQ_HERO.subtitle);
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
      hasAnyToken(tokens, ["portal", "carrier", "carriers"]) ||
      normIncludes(message, "carrier portal")
    ) {
      return this.actionProvider.suggestNavPage(
        "Carrier Portal",
        "/carrier-portal",
        "Access the SSP carrier portal.",
      );
    }

    if (
      hasAnyToken(tokens, ["employee", "employees", "staff", "internal"]) &&
      hasAnyToken(tokens, ["portal", "login", "access"])
    ) {
      return this.actionProvider.suggestNavPage(
        "Employee Portal",
        "/employee-portal",
        "Employee portal access for SSP team members.",
      );
    }

    if (
      hasAnyToken(tokens, ["privacy", "gdpr", "ccpa"]) ||
      normIncludes(message, "privacy policy")
    ) {
      return this.actionProvider.suggestNavPage(
        "Privacy Policy",
        "/privacy",
        "Review SSP privacy practices and data handling terms.",
      );
    }

    if (
      hasAnyToken(tokens, ["terms", "tos", "conditions", "legal"]) ||
      normIncludes(message, "terms of service")
    ) {
      return this.actionProvider.suggestNavPage(
        "Terms of Service",
        "/terms",
        "Review SSP website terms and service conditions.",
      );
    }

    if (
      hasAnyToken(tokens, ["cookie", "cookies", "consent", "tracking"]) &&
      !hasAnyToken(tokens, ["shipment", "shipments", "load", "loads", "freight"])
    ) {
      return this.actionProvider.suggestNavPage(
        "Cookie Policy",
        "/cookies",
        "Cookie policy, usage details, and consent information.",
      );
    }

    if (
      normIncludes(message, "cookie preferences") ||
      (hasAnyToken(tokens, ["cookie", "cookies"]) &&
        hasAnyToken(tokens, ["preference", "preferences"]))
    ) {
      return this.actionProvider.suggestNavPage(
        "Cookie Preferences",
        "/cookie-preferences",
        "Manage cookie preference settings.",
      );
    }

    if (
      hasAnyToken(tokens, ["accessibility", "accessible", "a11y"]) ||
      normIncludes(message, "accessibility statement")
    ) {
      return this.actionProvider.suggestNavPage(
        "Accessibility",
        "/accessibility",
        "Accessibility standards, support, and conformance details.",
      );
    }

    if (
      hasAnyToken(tokens, ["solution", "solutions", "service", "services", "freight", "shipping"])
    ) {
      return this.actionProvider.startSolutions();
    }

    if (tokens.includes("ltl")) {
      if (this.trySuggestSolution("/solutions/ltl")) return;
    }

    if (tokens.includes("truckload") || tokens.includes("tl") || tokens.includes("ftl")) {
      if (this.trySuggestSolution("/solutions/truckload")) return;
    }

    if (tokens.includes("dry") && tokens.includes("van")) {
      if (this.trySuggestSolution("/solutions/dry-van")) return;
    }

    if (tokens.includes("flatbed") || (tokens.includes("flat") && tokens.includes("bed"))) {
      if (hasAnyToken(tokens, ["step"])) {
        if (this.trySuggestSolution("/solutions/step-deck")) return;
      }
      if (this.trySuggestSolution("/solutions/flatbed")) return;
    }

    if (hasAnyToken(tokens, ["conestoga", "roll", "tite", "rolltite"])) {
      if (this.trySuggestSolution("/solutions/conestoga-roll-tite")) return;
    }

    if (hasAnyToken(tokens, ["rgn", "heavy", "haul", "oversize", "overweight"])) {
      if (this.trySuggestSolution("/solutions/rgn-heavy-haul")) return;
    }

    if (hasAnyToken(tokens, ["expedite", "expedited", "rush", "hotshot", "urgent"])) {
      if (this.trySuggestSolution("/solutions/expedited")) return;
    }

    if (
      hasAnyToken(tokens, ["specialized", "vehicle", "vehicles"]) ||
      normIncludes(message, "car hauling")
    ) {
      if (this.trySuggestSolution("/solutions/specialized-vehicles")) return;
    }

    if (
      hasAnyToken(tokens, ["project"]) &&
      hasAnyToken(tokens, ["freight", "cargo", "move", "phase"])
    ) {
      if (this.trySuggestSolution("/solutions/project-freight")) return;
    }

    if (hasAnyToken(tokens, ["hazmat", "hazardous", "tdg"])) {
      if (this.trySuggestSolution("/solutions/hazmat")) return;
    }

    if (hasAnyToken(tokens, ["temperature", "reefer", "cold", "refrigerated", "frozen"])) {
      if (this.trySuggestSolution("/solutions/temperature-controlled")) return;
    }

    if (
      hasAnyToken(tokens, ["mexico", "mexican"]) &&
      (hasAnyToken(tokens, ["border", "cross", "freight", "shipping", "corridor", "lane"]) ||
        hasAnyToken(tokens, ["pedimento"]))
    ) {
      if (this.trySuggestSolution("/solutions/cross-border/mexico")) return;
    }

    if (
      (hasAnyToken(tokens, ["canada", "canadian"]) &&
        hasAnyToken(tokens, ["usa", "us", "american", "united", "states"])) ||
      normIncludes(message, "canada to us") ||
      normIncludes(message, "us to canada") ||
      normIncludes(message, "canada usa")
    ) {
      if (this.trySuggestSolution("/solutions/cross-border/canada-usa")) return;
    }

    if (
      hasAnyToken(tokens, ["managed"]) &&
      hasAnyToken(tokens, ["logistics"]) &&
      !hasAnyToken(tokens, ["capacity"])
    ) {
      if (this.trySuggestSolution("/solutions/managed-logistics")) return;
    }

    if (
      (hasAnyToken(tokens, ["specialized", "critical"]) &&
        hasAnyToken(tokens, ["freight", "cargo", "shipment"])) ||
      normIncludes(message, "specialized freight")
    ) {
      if (this.trySuggestSolution("/solutions/specialized-critical-freight")) return;
    }

    if (
      (hasAnyToken(tokens, ["core"]) && hasAnyToken(tokens, ["freight", "modes", "equipment"])) ||
      normIncludes(message, "core freight modes")
    ) {
      if (this.trySuggestSolution("/solutions/core-freight-modes")) return;
    }

    if (
      hasAnyToken(tokens, ["cross", "border", "customs", "pedimento", "broker", "importer"]) ||
      normIncludes(message, "cross border")
    ) {
      if (this.trySuggestSolution("/solutions/cross-border")) return;
    }

    if (
      (tokens.includes("air") && hasAnyToken(tokens, ["freight", "cargo"])) ||
      normIncludes(message, "air freight")
    ) {
      if (this.trySuggestSolution("/solutions/cross-border/air-freight")) return;
    }

    if (hasAnyToken(tokens, ["ocean", "container"]) || normIncludes(message, "ocean freight")) {
      if (this.trySuggestSolution("/solutions/cross-border/ocean-freight")) return;
    }

    if (hasAnyToken(tokens, ["managed"]) && hasAnyToken(tokens, ["capacity"])) {
      if (this.trySuggestSolution("/solutions/managed-capacity")) return;
    }

    if (hasAnyToken(tokens, ["dedicated", "contract"]) || hasAnyToken(tokens, ["sla"])) {
      if (this.trySuggestSolution("/solutions/dedicated-contract")) return;
    }

    if (
      hasAnyToken(tokens, ["warehouse", "warehousing", "distribution", "storage"]) ||
      tokens.includes("3pl")
    ) {
      if (this.trySuggestSolution("/solutions/warehousing-distribution")) return;
    }

    const suggested = this.actionProvider.suggestNavOptions(message, { limit: 3 });
    if (suggested) return;

    return this.actionProvider.searchFaq(message);
  }
}

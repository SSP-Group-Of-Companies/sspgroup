// src/config/testimonials.ts

export type TestimonialItem =
  | {
      type: "video";
      id: "ssp-youtube";
      eyebrow: string;
      title: string;
      description?: string;
      youtubeUrl: string;
      channelUrl?: string;
    }
  | {
      type: "testimonial";
      id: string;
      rating: 1 | 2 | 3 | 4 | 5;
      quote: string;
      name: string;
      meta?: string; // company / role optional
    };

export const TRUST_PROOF_SECTION = {
  id: "trust-proof",
  kicker: "Proof in Practice",
  title: "Trust built in live operation",
  description:
    "Trust is established shipment by shipment: clear communication, named ownership, and the operating controls that make accountability real from booking through final delivery.",
} as const;

export const TRUST_PROOF_ITEMS: TestimonialItem[] = [
  {
    type: "video",
    id: "ssp-youtube",
    eyebrow: "Live operation preview",
    title: "A Decade of Growth, Reliability, and Trust",
    description:
      "Our story of scaling freight execution with accountable teams, dependable service, and partnerships built to last.",
    youtubeUrl: "https://www.youtube.com/watch?v=mQv-1GA-HYo&t=6s",
    channelUrl: "https://www.youtube.com/@SSPGroupofCompanies",
  },
  {
    type: "testimonial",
    id: "ben-horther",
    rating: 5,
    quote:
      "Our partnership with SSP has been excellent. They are consistently on time, provide clear updates, and step up quickly on special projects. They are one of our most reliable carrier partners in Canada.",
    name: "Ben Horther",
  },
  {
    type: "testimonial",
    id: "douglas-brown",
    rating: 5,
    quote:
      "We booked a Thursday pickup for Saturday delivery, then our customer needed one unit a day early. Sam and Raj adjusted fast and delivered on Friday. Service and communication were excellent.",
    name: "Douglas Brown",
  },
  {
    type: "testimonial",
    id: "richard-bucher",
    rating: 5,
    quote:
      "Great team to work with. They are consistently on time, their updates are dependable, and they are our first choice for Mexico-bound shipments.",
    name: "Richard Bucher",
  },
  {
    type: "testimonial",
    id: "jeff-smith",
    rating: 5,
    quote:
      "Great company. We hired them for an oversized shipment and their team supported both loading and unloading with their own equipment. They are now a preferred partner for cross-border freight.",
    name: "Jeff Smith",
  },

  // You can add more later (or placeholders):
  // {
  //   type: "testimonial",
  //   id: "placeholder-1",
  //   rating: 5,
  //   quote: "Lorem ipsum ...",
  //   name: "Name Here",
  //   meta: "Company / Role",
  // },
];


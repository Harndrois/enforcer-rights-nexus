export type Role = "public" | "super" | "junior";

export type Category =
  | "crime-person"
  | "property-financial"
  | "general"
  | "critical";

export interface CategoryDef {
  id: Category;
  title: string;
  tagline: string;
  description: string;
  subtypes: string[];
  accent: string; // tailwind gradient classes
  ring: string;
}

export interface Complaint {
  id: string;
  category: Category;
  subtype: string;
  title: string;
  location: string;
  status: "open" | "in-review" | "resolved" | "closed";
  urgency: "critical" | "high" | "medium" | "low";
  submittedAt: string;
  reporter: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  featured?: boolean;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: "junior" | "super";
  status: "approved" | "pending" | "suspended";
  lastActive: string;
  actions: string[];
}

export interface PetitionForm {
  fullName: string;
  age: string;
  location: string;
  category: Category;
  subtype: string;
  description: string;
  proofName: string;
  consented: boolean;
}

export type FooterTab =
  | "lawyers"
  | "activists"
  | "contact"
  | "terms"
  | "constitution";
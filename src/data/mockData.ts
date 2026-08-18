import type {
  CategoryDef,
  Complaint,
  Article,
  AdminAccount,
} from "../types";

export const CATEGORIES: CategoryDef[] = [
  {
    id: "crime-person",
    title: "Crime Against Person",
    tagline: "Offenses against the human body and dignity",
    description:
      "Report violent and personal offences involving harm, coercion, or the unlawful restraint of an individual.",
    subtypes: [
      "Sexual Assault",
      "Assault and Battery",
      "Homicide",
      "Kidnapping / Abduction",
    ],
    accent: "from-red-600 to-rose-700",
    ring: "ring-red-500/40",
  },
  {
    id: "property-financial",
    title: "Property & Financial Crime",
    tagline: "Fraud, theft and damage to assets",
    description:
      "File reports on deception, unlawful taking, and destruction of property or financial interests within the state.",
    subtypes: ["Fraud", "Theft / Larceny", "Burglary", "Arson"],
    accent: "from-emerald-500 to-green-700",
    ring: "ring-emerald-500/40",
  },
  {
    id: "general",
    title: "General Complaint",
    tagline: "For observers and the general public",
    description:
      "A channel for witnesses, community members and observers to flag incidents they have seen or become aware of.",
    subtypes: ["Public Nuisance", "Observation Report", "Community Concern", "Other"],
    accent: "from-zinc-600 to-zinc-800",
    ring: "ring-zinc-500/40",
  },
  {
    id: "critical",
    title: "Critical Issues",
    tagline: "Confidential, high-risk information",
    description:
      "A protected route for whistleblowers and at-risk individuals to relay confidential, high-risk information discreetly.",
    subtypes: ["Whistleblower", "Imminent Threat", "State Witness", "Protected Disclosure"],
    accent: "from-amber-500 to-red-600",
    ring: "ring-amber-500/40",
  },
];

export const SEED_COMPLAINTS: Complaint[] = [
  {
    id: "c-1001",
    category: "crime-person",
    subtype: "Kidnapping / Abduction",
    title: "Reported abduction near Apo district",
    location: "Abuja, FCT",
    status: "in-review",
    urgency: "critical",
    submittedAt: "2025-02-12T09:20:00Z",
    reporter: "Anonymous",
  },
  {
    id: "c-1002",
    category: "property-financial",
    subtype: "Fraud",
    title: "Ponzi scheme unsolicited investment",
    location: "Lagos, LG",
    status: "open",
    urgency: "high",
    submittedAt: "2025-02-11T14:03:00Z",
    reporter: "D. Adeyemi",
  },
  {
    id: "c-1003",
    category: "general",
    subtype: "Community Concern",
    title: "Recurring public disturbance",
    location: "Kano State",
    status: "resolved",
    urgency: "medium",
    submittedAt: "2025-02-09T18:44:00Z",
    reporter: "Witness #22",
  },
  {
    id: "c-1004",
    category: "critical",
    subtype: "Whistleblower",
    title: "Misuse of public funds contested",
    location: "Port Harcourt",
    status: "open",
    urgency: "high",
    submittedAt: "2025-02-10T11:30:00Z",
    reporter: "Protected",
  },
];

export const SEED_ARTICLES: Article[] = [
  {
    id: "a-1",
    title: "Court upholds landmark ruling on judicial reform",
    category: "Court Update",
    excerpt:
      "The Supreme Court delivered a precedent-setting judgment reinforcing due process for public prosecutions.",
    content:
      "In a decisive session, the apex court affirmed the constitutional safeguards governing criminal trials, emphasizing the right to a fair and public hearing.",
    date: "2025-02-13",
    author: "Justice Desk",
    featured: true,
  },
  {
    id: "a-2",
    title: "New directive on sexual assault case handling",
    category: "Policy",
    excerpt:
      "Agencies adopt survivor-centred protocols to protect dignity and confidentiality in sensitive investigations.",
    content:
      "The directive standardises intake, evidence handling and witness protection for survivors, ensuring sensitive matters are treated with the highest discretion.",
    date: "2025-02-08",
    author: "Media Unit",
  },
  {
    id: "a-3",
    title: "Public portal expands anonymous reporting channels",
    category: "Platform",
    excerpt:
      "Citizens can now lodge complaints discretely without revealing their identity.",
    content:
      "The expanded portal introduces encrypted reporting flows and clearer escalation paths for critical disclosures.",
    date: "2025-02-01",
    author: "Product Team",
  },
];

export const SEED_ADMINS: AdminAccount[] = [
  {
    id: "adm-1",
    name: "Emeka Okafor",
    email: "emeka@deenfforcer.org",
    role: "junior",
    status: "approved",
    lastActive: "2025-02-13T08:15:00Z",
    actions: ["Updated case c-1003", "Reviewed 2 complaints"],
  },
  {
    id: "adm-2",
    name: "Amina Bello",
    email: "amina@deenfforcer.org",
    role: "junior",
    status: "pending",
    lastActive: "2025-02-12T16:40:00Z",
    actions: ["Requested access"],
  },
  {
    id: "adm-3",
    name: "Tunde Lawal",
    email: "tunde@deenfforcer.org",
    role: "junior",
    status: "suspended",
    lastActive: "2025-01-30T10:05:00Z",
    actions: ["Flagged for review"],
  },
];

export const LAWYERS = [
  {
    name: "Barr. Funmi Adegoke",
    field: "Criminal Defence & Human Rights",
    bar: "Lagos Bar Association",
    phone: "+234 801 234 5678",
  },
  {
    name: "Chief Solomon Eze (SAN)",
    field: "Constitutional & Civil Litigation",
    bar: "Nigerian Bar Association",
    phone: "+234 802 987 6543",
  },
  {
    name: "Barr. Ngozi Okonkwo",
    field: "Family Law & Survivor Advocacy",
    bar: "Enugu Bar Association",
    phone: "+234 803 456 7890",
  },
];

export const ACTIVISTS = [
  {
    name: "Ibrahim Musa",
    focus: "Anti-Corruption & Whistleblower Protection",
    region: "Northern Nigeria",
  },
  {
    name: "Chiamaka Obi",
    focus: "Women's Rights & Sexual Violence Response",
    region: "South East",
  },
  {
    name: "Rotimi Adewale",
    focus: "Civic Education & Legal Aid Access",
    region: "South West",
  },
];

export const CONSTITUTION = [
  {
    section: "Section 39",
    title: "Freedom of Expression and the Press",
    body:
      "Every person shall be entitled to freedom of expression, including freedom to hold opinions and to receive and impart ideas and information without interference. Citizens may use reporting channels to share information without fear, subject to laws regulating the public interest and national security.",
  },
  {
    section: "Section 125A",
    title: "Guarantee of Process & Public Accountability",
    body:
      "State authorities shall ensure transparent, accountable processes in the administration of public trusts and the handling of citizen grievances, upholding the rule of law and the right of every person to seek lawful redress.",
  },
  {
    section: "Section 140",
    title: "Right to Fair Hearing and Dignity",
    body:
      "Every person accused of an offence shall be entitled to a fair hearing within a reasonable time by a court or tribunal. Sensitive cases, including sexual offences, shall be handled with respect for the dignity and privacy of all parties involved.",
  },
];

export const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
  "in-review": "bg-amber-500/15 text-amber-300 ring-amber-500/40",
  resolved: "bg-green-500/15 text-green-300 ring-green-500/40",
  closed: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/40",
};

export const URGENCY_STYLES: Record<string, string> = {
  critical: "text-red-400",
  high: "text-amber-300",
  medium: "text-emerald-300",
  low: "text-zinc-400",
};
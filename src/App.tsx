import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ShieldCheck,
  FileText,
  MapPin,
  Check,
  Lock,
} from "@phosphor-icons/react";
import Navbar from "./components/Navbar";
import HeroAndMission from "./components/HeroAndMission";
import ComplaintGrid from "./components/ComplaintGrid";
import MediaSection, { AdminConsole, AccessGuard } from "./components/MediaAndAdmin";
import FooterTabs from "./components/FooterTabs";
import { CATEGORIES, SEED_COMPLAINTS, SEED_ADMINS, STATUS_STYLES } from "./data/mockData";
import type { Category, Complaint, AdminAccount, Role, PetitionForm } from "./types";

const STORAGE_KEY = "deenfforcer_state_v1";

interface Persisted {
  complaints: Complaint[];
  admins: AdminAccount[];
}

function loadState(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Persisted;
  } catch {
    /* ignore */
  }
  return { complaints: SEED_COMPLAINTS, admins: SEED_ADMINS };
}

/* ---------------- Petition Modal ---------------- */

interface PetitionModalProps {
  cat: Category;
  subtype: string;
  onClose: () => void;
  onSubmit: (form: PetitionForm) => void;
}

function PetitionModal({ cat, subtype, onClose, onSubmit }: PetitionModalProps) {
  const def = CATEGORIES.find((c) => c.id === cat);
  const [form, setForm] = useState<PetitionForm>({
    fullName: "",
    age: "",
    location: "",
    category: cat,
    subtype,
    description: "",
    proofName: "witness-statement.txt",
    consented: false,
  });

  const set = <K extends keyof PetitionForm>(k: K, v: PetitionForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid = form.fullName.trim() && form.description.trim() && form.consented;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] overflow-y-auto bg-zinc-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-8 w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-red-950/40 to-zinc-900 p-5">
          <div className="flex items-center gap-2 text-red-300">
            <ShieldCheck className="h-5 w-5" weight="bold" />
            <span className="text-xs font-black uppercase tracking-widest">Intake Form</span>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" weight="bold" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            {def?.title}
          </div>
          <h3 className="mt-1 text-xl font-black text-white">{subtype}</h3>
          {cat === "critical" && (
            <p className="mt-2 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs leading-relaxed text-red-200">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" weight="fill" />
              Critical reports are encrypted end-to-end and visible only to senior
              supervisory officers.
            </p>
          )}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold text-zinc-400">Full Name</span>
              <input
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="e.g. Amaka Okafor"
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-zinc-400">Age</span>
              <input
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                placeholder="years"
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="flex items-center gap-1 text-xs font-bold text-zinc-400">
                <MapPin className="h-3.5 w-3.5" /> Location
              </span>
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="State / Local Area"
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-bold text-zinc-400">Description of Incident</span>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={4}
                placeholder="Provide a clear, factual account of what happened..."
                className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="flex items-center gap-1 text-xs font-bold text-zinc-400">
                <FileText className="h-3.5 w-3.5" /> Supporting Evidence
              </span>
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-white/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-400">
                {form.proofName}
                <button className="ml-auto text-xs font-bold text-emerald-400">Browse</button>
              </div>
            </label>
          </div>

          <label className="mt-5 flex items-start gap-2 text-xs text-zinc-400">
            <input
              type="checkbox"
              checked={form.consented}
              onChange={(e) => set("consented", e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-500"
            />
            I confirm the information given is true to the best of my knowledge and
            consent to its confidential processing by DE ENFORCER.
          </label>

          <button
            disabled={!valid}
            onClick={() => onSubmit(form)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-bold text-zinc-950 transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Check className="h-4 w-4" weight="bold" />
            Submit Confidential Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Admin Complaints Inbox ---------------- */

function ComplaintsInbox({ complaints }: { complaints: Complaint[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="inbox" className="bg-gradient-to-b from-zinc-950 to-zinc-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-red-400">
          <Lock className="h-4 w-4" weight="bold" /> Authorized Intake
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Complaints <span className="text-red-500">inbox</span>
        </h2>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          {complaints.length === 0 && (
            <div className="bg-zinc-950/60 p-10 text-center text-sm text-zinc-500">
              No complaints submitted yet.
            </div>
          )}
          {complaints.map((c) => (
            <button
              key={c.id}
              onClick={() => setOpen(open === c.id ? null : c.id)}
              className="flex w-full flex-col gap-2 border-b border-white/5 bg-zinc-950/60 px-4 py-3 text-left last:border-0 hover:bg-white/5 sm:flex-row sm:items-center sm:gap-4"
            >
              <span
                className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${
                  STATUS_STYLES[c.status] ?? "bg-zinc-500/15 text-zinc-300"
                }`}
              >
                {c.status}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-white">{c.subtype}</div>
                <div className="truncate text-xs text-zinc-500">{c.reporter}</div>
              </div>
              <span className="text-xs text-zinc-400">{c.location}</span>
              <span className="text-[11px] text-zinc-600">{c.submittedAt}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */

export default function App() {
  const [{ complaints, admins }, setState] = useState<Persisted>(loadState);
  const [role, setRole] = useState<Role>("public");
  const [petition, setPetition] = useState<{ cat: Category; subtype: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ complaints, admins }));
    } catch {
      /* ignore */
    }
  }, [complaints, admins]);

  const showToast = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 3200);
  };

  const openPetition = (cat: Category, subtype: string) => {
    if (role !== "public") {
      showToast("Switch to Public Access to file a report.");
      return;
    }
    setPetition({ cat, subtype });
  };

  const submitPetition = (form: PetitionForm) => {
    const id = `CP-${Date.now()}`;
    const rec: Complaint = {
      id,
      category: form.category,
      subtype: form.subtype,
      title: form.subtype,
      location: form.location || "Unsure",
      status: "open",
      urgency: form.category === "critical" ? "critical" : "high",
      submittedAt: new Date().toLocaleDateString("en-NG"),
      reporter: form.fullName,
    };
    setState((s) => ({ ...s, complaints: [rec, ...s.complaints] }));
    setPetition(null);
    showToast("Report submitted. A tracking reference has been issued.");
  };

  const updateAdmins = (fn: (prev: AdminAccount[]) => AdminAccount[]) =>
    setState((s) => ({ ...s, admins: fn(s.admins) }));

  const isAdmin = role !== "public";

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased">
      <Navbar
        role={role}
        setRole={setRole}
        onPetition={() => openPetition("general", "General Complaint")}
        onNews={() => document.getElementById("news")?.scrollIntoView({ behavior: "smooth" })}
        onComplaints={() => document.getElementById("complaints")?.scrollIntoView({ behavior: "smooth" })}
        onContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      />

      <AccessGuard role={role} />
      <HeroAndMission
        role={role}
        onPetition={() => openPetition("general", "General Complaint")}
        onComplaints={() => document.getElementById("complaints")?.scrollIntoView({ behavior: "smooth" })}
      />
      <ComplaintGrid onPetition={openPetition} />
      <MediaSection onContact={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />

      {isAdmin && <ComplaintsInbox complaints={complaints} />}
      {isAdmin && <AdminConsole admins={admins} setAdmins={updateAdmins} />}

      <FooterTabs />

      <AnimatePresence>
        {petition && (
          <PetitionModal
            cat={petition.cat}
            subtype={petition.subtype}
            onClose={() => setPetition(null)}
            onSubmit={submitPetition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 left-1/2 z-[90] w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-500/40 bg-zinc-900 px-5 py-4 text-center text-sm font-semibold text-emerald-300 shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
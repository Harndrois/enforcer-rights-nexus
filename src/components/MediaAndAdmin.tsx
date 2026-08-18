import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Newspaper,
  Calendar,
  Check,
  X,
  UserPlus,
  MagnifyingGlass,
  ShieldCheck,
  Pulse,
  FileMagnifyingGlass,
} from "@phosphor-icons/react";
import { SEED_ARTICLES, SEED_ADMINS, STATUS_STYLES } from "../data/mockData";
import type { AdminAccount, Role } from "../types";

/* ---------------- News / Media ---------------- */

export function MediaSection({ onContact }: { onContact: () => void }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("All");
  const cats = ["All", ...Array.from(new Set(SEED_ARTICLES.map((a) => a.category)))];
  const list = filter === "All" ? SEED_ARTICLES : SEED_ARTICLES.filter((a) => a.category === filter);
  const featured = SEED_ARTICLES.find((a) => a.featured);

  return (
    <section id="news" className="bg-gradient-to-b from-zinc-950 to-zinc-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
          <Newspaper className="h-4 w-4" weight="bold" />
          News &amp; Law Updates
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          The <span className="text-red-500">state</span> of justice
        </h2>

        {/* Category tabs (dynamic) */}
        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                filter === c
                  ? "bg-emerald-500 text-zinc-950"
                  : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {featured && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 overflow-hidden rounded-3xl border border-emerald-500/20 bg-zinc-900/60"
          >
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
              <img
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/dcaa4124-1c34-4630-8b13-a75dd20fc8ad/court-gavel-detail-a91d2e64-1787074281232.webp"
                alt={featured.title}
                className="h-48 w-full rounded-2xl object-cover lg:h-full"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <span>Featured</span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Calendar className="h-3.5 w-3.5" /> {featured.date}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-black leading-tight text-white">
                  {featured.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{featured.excerpt}</p>
                <button
                  onClick={onContact}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-bold text-zinc-950 transition-transform active:scale-[0.98]"
                >
                  Read Full Coverage
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Article grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <motion.article
              key={a.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
              className="cursor-pointer rounded-2xl border border-white/10 bg-zinc-950/60 p-6 transition-colors hover:border-emerald-500/40"
            >
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-white/10">
                {a.category}
              </span>
              <h4 className="mt-3 text-base font-bold leading-snug text-white">{a.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{a.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {a.date}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Admin Dashboards ---------------- */

interface AdminProps {
  admins: AdminAccount[];
  setAdmins: (fn: (prev: AdminAccount[]) => AdminAccount[]) => void;
}

function ApprovedAdmins({ admins, setAdmins }: AdminProps) {
  const approve = (id: string) =>
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a)));
  const action = (id: string, s: AdminAccount["status"]) =>
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, status: s } : a)));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3">
        <div className="relative flex-1 min-w-[200px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            placeholder="Search officers..."
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none"
          />
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-zinc-950">
          <UserPlus className="h-4 w-4" weight="bold" /> Invite
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        {admins.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between gap-4 border-b border-white/5 bg-zinc-950/60 px-4 py-3 last:border-0"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-green-700 text-xs font-black text-white">
                  {a.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-white">{a.name}</div>
                  <div className="truncate text-xs text-zinc-500">{a.email}</div>
                </div>
              </div>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${
                a.status === "approved"
                  ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
                  : a.status === "pending"
                  ? "bg-amber-500/15 text-amber-300 ring-amber-500/40"
                  : "bg-red-500/15 text-red-300 ring-red-500/40"
              }`}
            >
              {a.status}
            </span>
            <div className="flex items-center gap-1.5">
              {a.status === "pending" && (
                <button
                  onClick={() => approve(a.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                  title="Approve"
                >
                  <Check className="h-4 w-4" weight="bold" />
                </button>
              )}
              {a.status === "approved" && (
                <button
                  onClick={() => action(a.id, "suspended")}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
                  title="Suspend"
                >
                  <X className="h-4 w-4" weight="bold" />
                </button>
              )}
              {a.status === "suspended" && (
                <button
                  onClick={() => action(a.id, "approved")}
                  className="rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-bold text-zinc-950"
                >
                  Restore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminConsole({ admins, setAdmins }: AdminProps) {
  const reduce = useReducedMotion();
  const total = { all: admins.length, approved: admins.filter((a) => a.status === "approved").length, pending: admins.filter((a) => a.status === "pending").length };

  return (
    <section className="relative isolate overflow-hidden bg-zinc-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-red-400">
          <ShieldCheck className="h-4 w-4" weight="bold" />
          Authorized Console
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Officer <span className="text-red-500">administration</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
          This area is restricted to authorised enforcement personnel. Manage
          officer access and monitor intake live.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.6fr_1.4fr]">
          {/* Live stats */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
              <div className="flex items-center gap-2 text-white">
                <Pulse className="h-5 w-5 text-emerald-400" weight="bold" /> Live Overview
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  ["84", "Active Cases"],
                  [total.all, "Officers"],
                  ["12", "In Review"],
                  [total.pending, "Pending"],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-2xl border border-white/5 bg-zinc-950/60 p-3 text-center">
                    <div className="text-2xl font-black text-white">{n}</div>
                    <div className="text-[11px] uppercase tracking-wide text-zinc-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-start gap-3">
                <FileMagnifyingGlass className="h-5 w-5 shrink-0 text-amber-300" weight="bold" />
                <p className="text-sm leading-relaxed text-zinc-300">
                  <span className="font-bold text-amber-300">Moderation note:</span> all
                  officer approvals are logged to the audit trail for full accountability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Officer list */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ApprovedAdmins admins={admins} setAdmins={setAdmins} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Public vs Admin guard UI ---------------- */

export function AccessGuard({ role }: { role: Role }) {
  if (role === "public") return null;
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
      <div className="flex items-center justify-between rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-red-300">
          <ShieldCheck className="h-4 w-4" weight="bold" />
          Authorized admin session active
        </div>
        <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300">
          {role === "super" ? "SUPER" : "JUNIOR"}
        </span>
      </div>
    </div>
  );
}

export default MediaSection;
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Scales,
  Users,
  Phone,
  Article,
  Buildings,
  Bank,
  FileText,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { LAWYERS, ACTIVISTS, CONSTITUTION } from "../data/mockData";
import type { FooterTab } from "../types";

const TABS: { id: FooterTab; label: string; icon: React.ElementType }[] = [
  { id: "lawyers", label: "Potential Lawyers", icon: Scales },
  { id: "activists", label: "Activists & NGOs", icon: Users },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "terms", label: "Terms", icon: Article },
  { id: "constitution", label: "Constitution", icon: Buildings },
];

export default function Footer() {
  const [tab, setTab] = useState<FooterTab>("lawyers");
  const reduce = useReducedMotion();
  const accent = tab === "constitution" ? "emerald" : tab === "terms" ? "red" : "green";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-zinc-950">
      {/* top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-emerald-500 to-white/20" />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                tab === t.id
                  ? "bg-emerald-500 text-zinc-950"
                  : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <t.icon className="h-4 w-4" weight="bold" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-8 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "lawyers" && (
                <div className="grid gap-4 md:grid-cols-3">
                  {LAWYERS.map((l) => (
                    <div
                      key={l.name}
                      className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        <Scales className="h-4 w-4" weight="bold" /> Legal Counsel
                      </div>
                      <h4 className="mt-2 text-base font-black text-white">{l.name}</h4>
                      <p className="mt-1 text-sm font-medium text-emerald-300">{l.field}</p>
                      <p className="mt-1 text-xs text-zinc-500">{l.bar}</p>
                      <button className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white hover:text-emerald-400">
                        {l.phone} <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {tab === "activists" && (
                <div className="grid gap-4 md:grid-cols-3">
                  {ACTIVISTS.map((a) => (
                    <div
                      key={a.name}
                      className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        <Users className="h-4 w-4" weight="bold" /> Advocate
                      </div>
                      <h4 className="mt-2 text-base font-black text-white">{a.name}</h4>
                      <p className="mt-1 text-sm font-medium text-zinc-300">{a.focus}</p>
                      <p className="mt-1 text-xs text-zinc-500">{a.region}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === "contact" && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-black text-white">Get in touch</h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      Reach the DE ENFORCER compliance and support desk for
                      assistance, partnership or reporting guidance.
                    </p>
                    <div className="mt-4 space-y-2 text-sm text-zinc-300">
                      <div>+234 800 000 0000</div>
                      <div>support@deenfforcer.org</div>
                      <div>Federal Secretariat, Abuja</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                      <Bank className="h-4 w-4" weight="bold" /> Hours
                    </div>
                    <p className="mt-3 text-sm text-zinc-300">
                      Mon – Fri, 8am – 5pm (WAT). Critical reports accepted 24/7.
                    </p>
                  </div>
                </div>
              )}

              {tab === "terms" && (
                <div className="max-w-3xl">
                  <h4 className="flex items-center gap-2 text-lg font-black text-white">
                    <FileText className="h-5 w-5 text-red-500" weight="bold" /> Terms of Use
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    By using DE ENFORCER you agree that reports are provided in good
                    faith. Authorised access is reserved for verified officers under
                    the relevant enforcement laws. Misrepresentation is prohibited.
                  </p>
                </div>
              )}

              {tab === "constitution" && (
                <div className="grid gap-4">
                  {CONSTITUTION.map((c) => (
                    <div
                      key={c.section}
                      className={`rounded-2xl border p-5 ${accent === "emerald" ? "border-emerald-500/20 bg-emerald-500/5" : ""}`}
                    >
                      <div className="text-xs font-black uppercase tracking-widest text-emerald-400">
                        {c.section}
                      </div>
                      <h4 className="mt-1 text-base font-black text-white">{c.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{c.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-700">
              <Scales className="h-4 w-4 text-white" weight="bold" />
            </span>
            <span className="text-sm font-black tracking-tight text-white">
              DE ENFORCER
            </span>
            <span className="text-xs text-zinc-500">· Unity &amp; Faith, Peace &amp; Progress</span>
          </div>
          <p className="text-xs text-zinc-600">
            © 2025 DE ENFORCER. Built under the Nigerian Coat of Arms.
          </p>
        </div>
      </div>
    </footer>
  );
}
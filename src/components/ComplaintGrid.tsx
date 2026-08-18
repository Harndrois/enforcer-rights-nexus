import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  X,
  MapPin,
  WarningCircle,
  CaretRight,
  Check,
} from "@phosphor-icons/react";
import { CATEGORIES } from "../data/mockData";
import type { Category, PetitionForm } from "../types";

const SEXUAL_HELP =
  "This matter relates to sexual assault. DE ENFORCER directs survivors to specialised, confidential support where trained specialists protect your dignity and privacy every step of the way.";

interface Props {
  onPetition: (cat: Category, sub: string) => void;
}

export default function ComplaintGrid({ onPetition }: Props) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<Category | null>(null);
  const [openSubtype, setOpenSubtype] = useState<{ cat: Category; sub: string } | null>(null);

  const isSexual = openSubtype?.sub.toLowerCase().includes("sexual");

  return (
    <section id="complaints" className="bg-zinc-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
          <WarningCircle className="h-4 w-4" weight="bold" />
          Complaint Categories
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Choose where your report <span className="text-red-500">belongs</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
          Select a category to view its specific offences, then file a detailed
          petition. Critical and sensitive reports are handled with the highest
          discretion.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const isOpen = expanded === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`group flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 transition-all hover:-translate-y-1 hover:border-white/20 ${
                  isOpen ? `ring-1 ${cat.ring}` : ""
                }`}
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${cat.accent} text-white shadow-lg`}
                >
                  <WarningCircle className="h-6 w-6" weight="bold" />
                </div>

                <h3 className="mt-4 text-lg font-black leading-tight text-white">
                  {cat.title}
                </h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {cat.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {cat.description}
                </p>

                <div className="mt-4 space-y-1.5">
                  {cat.subtypes.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setOpenSubtype({ cat: cat.id, sub })}
                      className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-left text-sm font-medium text-zinc-200 transition-colors hover:bg-white/10"
                    >
                      {sub}
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-500" weight="bold" />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setExpanded(isOpen ? null : cat.id)}
                  className="mt-4 inline-flex w-full items-center justify-between text-xs font-bold uppercase tracking-wide text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  <span>{isOpen ? "Collapse" : "Details"}</span>
                  <CaretRight
                    className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    weight="bold"
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subtype detail modal */}
      <AnimatePresence>
        {openSubtype && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-zinc-950/80 p-4 backdrop-blur-sm"
            onClick={() => setOpenSubtype(null)}
          >
            <motion.div
              initial={reduce ? false : { scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={reduce ? undefined : { scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    {CATEGORIES.find((c) => c.id === openSubtype.cat)?.title}
                  </div>
                  <h3 className="mt-1 text-xl font-black text-white">
                    {openSubtype.sub}
                  </h3>
                </div>
                <button
                  onClick={() => setOpenSubtype(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" weight="bold" />
                </button>
              </div>

              <div className="p-5">
                {isSexual ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <WarningCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-400" weight="fill" />
                      <div>
                        <p className="text-sm font-bold text-red-300">
                          Specialised handling required
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                          {SEXUAL_HELP}
                        </p>
                        <button
                          onClick={() => onPetition(openSubtype.cat, openSubtype.sub)}
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition-transform active:scale-[0.98]"
                        >
                          Continue Confidential Intake
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      You are about to file a formal petition under this
                      category. Provide your details and any supporting proof to
                      begin the legal consultation process.
                    </p>
                    <button
                      onClick={() => onPetition(openSubtype.cat, openSubtype.sub)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-bold text-zinc-950 transition-transform active:scale-[0.98]"
                    >
                      <Check className="h-4 w-4" weight="bold" />
                      File This Petition
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
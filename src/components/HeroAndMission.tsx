import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Gavel, Scales, Shield } from "@phosphor-icons/react";
import type { Role } from "../types";

const HERO_IMG =
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/dcaa4124-1c34-4630-8b13-a75dd20fc8ad/courtroom-hero-a8739368-1787074280268.webp";
const COAT_IMG =
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/dcaa4124-1c34-4630-8b13-a75dd20fc8ad/coat-of-arms-badge-bfafaf3b-1787074281410.webp";

interface HeroProps {
  role: Role;
  onPetition: () => void;
  onComplaints: () => void;
}

export default function HeroAndMission({
  role,
  onPetition,
  onComplaints,
}: HeroProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-zinc-950">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt="Nigerian courtroom interior"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-24 lg:pt-20">
        {/* Left: copy */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <Gavel className="h-3.5 w-3.5" weight="bold" />
            Federal Republic of Nigeria
          </span>

          <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
            Where{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              justice
            </span>{" "}
            is defended
            <span className="text-red-500">.</span>
          </h1>

          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-zinc-300 sm:text-lg">
            DE ENFORCER is a civic platform for reporting crime, seeking legal
            counsel and strengthening the rule of law, honoured under the
            Nigerian Coat of Arms.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={onComplaints}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Shield className="h-4 w-4" weight="bold" />
              Report a Complaint
            </button>
            {role !== "public" && (
              <button
                onClick={onPetition}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <ArrowRight className="h-4 w-4" weight="bold" />
                Review Inbox
              </button>
            )}
          </div>

          {/* Status counters */}
          <div className="mt-9 flex flex-wrap gap-6">
            {[
              ["1,240+", "Complaints Tracked"],
              ["38", "Partner Lawyers"],
              ["24hrs", "Response Window"],
            ].map(([n, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-white">{n}</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: coat of arms + mission */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <img
                src={COAT_IMG}
                alt="Nigerian Coat of Arms"
                className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/20"
              />
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400 ring-1 ring-red-500/30">
                Unity &amp; Faith
              </span>
            </div>

            <h2 className="mt-5 text-xl font-black tracking-tight text-white">
              The Mission
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              To empower every citizen to uphold justice with dignity, and to
              give authorised officers the tools to act with integrity and
              speed.
            </p>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    Guided by the Constitution of the Federal Republic of
                    Nigeria, DE ENFORCER safeguards the rights to free
                    expression, fair hearing and public accountability. Every
                    report is a step toward a nation where the law protects all.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Scales className="h-4 w-4" weight="bold" />
                    <span>Enforcing the law, protecting the people.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-emerald-400"
            >
              {open ? "View Less" : "View More"}
              <ArrowRight
                className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
                weight="bold"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
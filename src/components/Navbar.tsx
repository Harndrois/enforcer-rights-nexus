import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  Scales,
  ShieldCheck,
  Lock,
  User,
  Users,
  SignOut,
} from "@phosphor-icons/react";
import type { Role } from "../types";

interface NavbarProps {
  role: Role;
  setRole: (r: Role) => void;
  onPetition: () => void;
  onNews: () => void;
  onComplaints: () => void;
  onContact: () => void;
}

const ROLE_OPTIONS: { id: Role; label: string; icon: ComponentType<{ weight?: string; className?: string }> }[] = [
  { id: "public", label: "Public Access", icon: User },
  { id: "super", label: "Super Admin", icon: ShieldCheck },
  { id: "junior", label: "Junior Admin", icon: Users },
];

export default function Navbar({
  role,
  setRole,
  onPetition,
  onNews,
  onComplaints,
  onContact,
}: NavbarProps) {
  const active = ROLE_OPTIONS.find((o) => o.id === role)!;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 ring-1 ring-white/20">
            <Scales className="h-6 w-6 text-white" weight="bold" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-base font-black tracking-tight text-white">
              DE ENFORCER
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-emerald-400">
              Justice for All
            </span>
          </span>
        </button>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-300 lg:flex">
          {[
            { label: "Complaints", onClick: onComplaints },
            { label: "News", onClick: onNews },
            { label: "Contact", onClick: onContact },
          ].map((l) => (
            <button
              key={l.label}
              onClick={l.onClick}
              className="text-zinc-300 transition-colors hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Role switcher + petition */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-900/80 p-1">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRole(opt.id)}
                  className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    role === opt.id
                      ? "text-zinc-950"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {role === opt.id && (
                    <motion.span
                      layoutId="role-pill"
                      className={`absolute inset-0 rounded-full ${
                        opt.id === "public"
                          ? "bg-emerald-400"
                          : "bg-red-500"
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    />
                  )}
                  <opt.icon weight="bold" className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {role !== "public" ? (
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 sm:flex">
              <Lock className="h-3.5 w-3.5" weight="fill" />
              Authorized
            </span>
          ) : (
            <button
              onClick={onPetition}
              className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-transform active:scale-[0.98] sm:flex"
            >
              <Gavel className="h-4 w-4" weight="bold" />
              File Petition
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              setRole(role === "public" ? "super" : "public");
            }}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-300 sm:hidden"
          >
            <SignOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile role strip */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:hidden">
        {ROLE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setRole(opt.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              role === opt.id
                ? "bg-emerald-500 text-zinc-950"
                : "border border-white/10 text-zinc-400"
            }`}
          >
            <opt.icon weight="bold" className="h-3.5 w-3.5" />
            {opt.label}
          </button>
        ))}
        <button
          onClick={onPetition}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white"
        >
          <Gavel className="h-3.5 w-3.5" /> File Petition
        </button>
      </div>
    </header>
  );
}
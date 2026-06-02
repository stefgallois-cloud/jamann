"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Users,
  Settings,
  Menu,
  X,
  Clock,
  Mountain,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";
import { WeeklyCalendar } from "@/components/planning/WeeklyCalendar";
import {
  initializeStorage,
  loadShifts,
  loadEmployees,
  saveShifts,
  resetStorage,
} from "@/lib/storage";
import type { Shift, Employee } from "@/lib/mock-data";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Initialize from localStorage on mount
  useEffect(() => {
    initializeStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShifts(loadShifts());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmployees(loadEmployees());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  // Save shifts whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveShifts(shifts);
    }
  }, [shifts, isLoaded]);

  const handleShiftsChange = (newShifts: Shift[]) => {
    setShifts(newShifts);
  };

  const handleReset = () => {
    resetStorage();
    setShifts(loadShifts());
    setEmployees(loadEmployees());
  };

  // Calculate stats
  const totalHoursPlanned = shifts.reduce((acc, shift) => {
    const [sh, sm] = shift.startTime.split(":").map(Number);
    const [eh, em] = shift.endTime.split(":").map(Number);
    return acc + (eh + em / 60) - (sh + sm / 60);
  }, 0);

  const activeNav = "planning";

  return (
    <div className="min-h-screen bg-[var(--manoire-creme)] text-[var(--manoire-bordeaux)] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--manoire-bordeaux)] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Le Manoïre"
            width={36}
            height={36}
            className="object-contain drop-shadow-md rounded-lg"
          />
          <h1 className="text-lg font-[family-name:var(--font-display)] text-[var(--manoire-beige)] tracking-wide">
            Le Manoïre
          </h1>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[var(--manoire-beige)] hover:text-white transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        fixed md:static inset-y-0 left-0 z-40 w-72
        bg-[var(--manoire-bordeaux)]
        p-6 flex flex-col
        transition-transform duration-300 ease-in-out
        shadow-2xl md:shadow-none
      `}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-4 mb-10">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Le Manoïre Logo"
              width={56}
              height={56}
              className="object-contain drop-shadow-lg rounded-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[var(--manoire-bordeaux)]" />
          </div>
          <div>
            <h1 className="text-xl font-[family-name:var(--font-display)] text-[var(--manoire-beige)] tracking-wide">
              Le Manoïre
            </h1>
            <p className="text-[11px] font-medium text-[var(--manoire-beige)]/60 uppercase tracking-[0.2em] mt-0.5">
              Espace Équipe
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 mt-8 md:mt-0">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
              activeNav === "planning"
                ? "bg-white/15 text-white shadow-lg shadow-black/10 backdrop-blur-sm"
                : "text-[var(--manoire-beige)]/70 hover:bg-white/10 hover:text-[var(--manoire-beige)]"
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            Planning
          </Link>
          <Link
            href="/equipe"
            className="flex items-center gap-3 px-4 py-3.5 text-[var(--manoire-beige)]/70 hover:bg-white/10 hover:text-[var(--manoire-beige)] rounded-xl font-medium transition-all duration-200"
          >
            <Users className="w-5 h-5" />
            Équipe
          </Link>
          <Link
            href="/onboarding"
            className="flex items-center gap-3 px-4 py-3.5 text-[var(--manoire-beige)]/70 hover:bg-white/10 hover:text-[var(--manoire-beige)] rounded-xl font-medium transition-all duration-200"
          >
            <Settings className="w-5 h-5" />
            Onboarding
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--manoire-caramel)] flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--manoire-beige)]">
                Gérant
              </p>
              <p className="text-xs text-[var(--manoire-beige)]/50">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)]">
              Planning de la Semaine
            </h2>
            <p className="text-[var(--manoire-kaki)] mt-1 md:mt-2 text-sm md:text-base">
              Gérez et organisez le planning de votre équipe d&apos;alpage.
            </p>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <Button
              onClick={() => {
                confetti({
                  particleCount: 150,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#954315', '#C58632', '#E06530', '#7B694D', '#4B0F1F']
                });
                setToastMessage("🤖 L'IA est partie prendre un café ☕, elle revient bientôt pour générer vos plannings !");
                setTimeout(() => {
                  setToastMessage("");
                }, 4000);
              }}
              className="bg-[var(--manoire-bordeaux)] hover:bg-[#3a0b17] text-[var(--manoire-beige)] rounded-xl gap-2 shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[var(--manoire-caramel)]" />
              <span className="hidden sm:inline">Générer par IA</span>
              <span className="sm:hidden">IA</span>
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-[var(--manoire-beige)] text-[var(--manoire-kaki)] hover:bg-[var(--manoire-beige)]/30 rounded-xl gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </Button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Team Available */}
          <div className="bg-[var(--manoire-blanc)] p-5 md:p-6 rounded-2xl border border-[var(--manoire-beige)]/40 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Users className="w-20 h-20 text-[var(--manoire-caramel)]" />
            </div>
            <h3 className="text-[var(--manoire-kaki)] text-xs font-semibold mb-2 uppercase tracking-wider">
              Équipe disponible
            </h3>
            <p className="text-4xl font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)]">
              {employees.length}{" "}
              <span className="text-lg font-medium text-[var(--manoire-kaki)]">
                / {employees.length}
              </span>
            </p>
          </div>

          {/* Hours Planned */}
          <div className="bg-[var(--manoire-blanc)] p-5 md:p-6 rounded-2xl border border-[var(--manoire-beige)]/40 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <Clock className="w-20 h-20 text-[var(--manoire-ocre)]" />
            </div>
            <h3 className="text-[var(--manoire-kaki)] text-xs font-semibold mb-2 uppercase tracking-wider">
              Heures planifiées
            </h3>
            <p className="text-4xl font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)]">
              {Math.round(totalHoursPlanned)}h
            </p>
          </div>

          {/* Week Status */}
          <div className="bg-[var(--manoire-blanc)] p-5 md:p-6 rounded-2xl border border-[var(--manoire-beige)]/40 shadow-sm sm:col-span-2 lg:col-span-1">
            <h3 className="text-[var(--manoire-kaki)] text-xs font-semibold mb-4 uppercase tracking-wider">
              Statut de la semaine
            </h3>
            {shifts.length > 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
                  ✓ Planning configuré
                </span>
                <p className="text-xs text-emerald-700 font-medium">
                  {shifts.length} shifts répartis sur la semaine
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                  Aucun shift
                </span>
                <p className="text-xs text-amber-700 font-medium">
                  Ajoutez des shifts via le calendrier ci-dessous.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Calendar */}
        {isLoaded ? (
          <WeeklyCalendar
            employees={employees}
            shifts={shifts}
            onShiftsChange={handleShiftsChange}
          />
        ) : (
          <div className="bg-[var(--manoire-blanc)] rounded-3xl border border-[var(--manoire-beige)]/40 shadow-sm overflow-hidden min-h-[400px] md:h-[600px] flex items-center justify-center p-6 relative">
            <div className="text-center relative z-10 p-8 max-w-md mx-auto animate-pulse">
              <div className="w-24 h-24 bg-[var(--manoire-creme)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Mountain className="w-10 h-10 text-[var(--manoire-kaki)]" />
              </div>
              <h3 className="text-xl font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)] mb-2">
                Chargement...
              </h3>
            </div>
          </div>
        )}
        {/* Custom Toast Message for Mobile Compatibility */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--manoire-bordeaux)] text-[var(--manoire-creme)] px-6 py-3 rounded-full shadow-2xl z-50 text-sm font-medium animate-in slide-in-from-bottom-5 fade-in duration-300 text-center whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </main>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

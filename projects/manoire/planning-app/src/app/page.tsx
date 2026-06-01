"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Settings, Wand2, Menu, X, Bell } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Le Manoïre" width={40} height={40} className="object-contain" />
          <h1 className="text-xl font-bold tracking-tight text-[#8b5a2b]">Le Manoïre</h1>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-stone-500">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-stone-200 p-6 flex flex-col transition-transform duration-300 ease-in-out
      `}>
        <div className="hidden md:flex items-center gap-4 mb-10">
          <Image src="/logo.png" alt="Le Manoïre Logo" width={60} height={60} className="object-contain drop-shadow-md" />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#5A3E26]">Le Manoïre</h1>
            <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mt-1">Espace Équipe</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-3 mt-8 md:mt-0">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#5A3E26] text-white rounded-xl shadow-md font-semibold transition-transform hover:scale-[1.02]">
            <CalendarDays className="w-5 h-5" />
            Planning
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-100 rounded-xl font-medium transition-all">
            <Users className="w-5 h-5" />
            Équipe
          </a>
          <a href="/onboarding" className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-100 rounded-xl font-medium transition-all">
            <Settings className="w-5 h-5" />
            Onboarding Personnel
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-stone-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <Users className="w-5 h-5 text-stone-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-stone-800">Gérant</p>
            <p className="text-xs text-stone-500">Admin</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800">Semaine du 29 Juin au 5 Juillet</h2>
            <p className="text-stone-500 mt-1 md:mt-2 text-sm md:text-base">Générez et gérez le planning de votre équipe d'alpage.</p>
          </div>
          
          <div className="flex w-full md:w-auto items-center gap-3">
            <Button variant="outline" size="icon" className="hidden md:flex rounded-full bg-white border-stone-200 shadow-sm text-stone-500">
              <Bell className="w-4 h-4" />
            </Button>
            <Button className="w-full md:w-auto bg-[#8b5a2b] hover:bg-[#6b421c] text-white gap-2 shadow-lg hover:shadow-xl transition-all rounded-full px-6 py-6 text-base">
              <Wand2 className="w-5 h-5" />
              Générer par IA
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-16 h-16 text-[#8b5a2b]" />
            </div>
            <h3 className="text-stone-500 text-sm font-semibold mb-2 uppercase tracking-wide">Équipe disponible</h3>
            <p className="text-4xl font-extrabold text-stone-800">8 <span className="text-lg font-medium text-stone-400">/ 10</span></p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarDays className="w-16 h-16 text-[#8b5a2b]" />
            </div>
            <h3 className="text-stone-500 text-sm font-semibold mb-2 uppercase tracking-wide">Heures à planifier</h3>
            <p className="text-4xl font-extrabold text-stone-800">185h</p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl border border-stone-100 shadow-sm sm:col-span-2 lg:col-span-1">
            <h3 className="text-stone-500 text-sm font-semibold mb-4 uppercase tracking-wide">Statut de la semaine</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                Brouillon non généré
              </span>
              <p className="text-xs text-amber-700 font-medium">L'IA est prête à concevoir le planning.</p>
            </div>
          </div>
        </div>

        {/* Calendar Placeholder */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden min-h-[400px] md:h-[600px] flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-[0.03]"></div>
          <div className="text-center relative z-10 p-8 max-w-md mx-auto">
            <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CalendarDays className="w-10 h-10 text-stone-400" />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">La toile est vierge</h3>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Le planning de cette semaine n'a pas encore été généré. Cliquez sur le bouton magique pour laisser l'IA attribuer les shifts en respectant vos règles.
            </p>
            <Button variant="outline" className="border-stone-200 text-stone-600 hover:bg-stone-50 rounded-full px-6">
              Ou créer un planning manuellement
            </Button>
          </div>
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

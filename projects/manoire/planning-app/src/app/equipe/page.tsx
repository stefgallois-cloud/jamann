"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  Users,
  Settings,
  Menu,
  X,
  Pencil,
  Trash2,
  UserPlus,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  initializeStorage,
  loadEmployees,
  removeEmployee,
  updateEmployee,
  generateId,
  addEmployee,
} from "@/lib/storage";
import type { Employee } from "@/lib/mock-data";

const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  Manager: { bg: "bg-[#954315]/15", text: "text-[#954315]" },
  "Chef de Rang": { bg: "bg-[#C58632]/15", text: "text-[#C58632]" },
  Serveuse: { bg: "bg-[#E06530]/15", text: "text-[#E06530]" },
  Serveur: { bg: "bg-[#E06530]/15", text: "text-[#E06530]" },
  "Chef Cuistot": { bg: "bg-[#7B694D]/15", text: "text-[#7B694D]" },
  Cuisinier: { bg: "bg-[#7B694D]/15", text: "text-[#7B694D]" },
  Plongeur: { bg: "bg-[#4B0F1F]/15", text: "text-[#4B0F1F]" },
  Plongeuse: { bg: "bg-[#4B0F1F]/15", text: "text-[#4B0F1F]" },
  Barman: { bg: "bg-[#C58632]/15", text: "text-[#C58632]" },
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function EquipePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formMaxHours, setFormMaxHours] = useState("");

  useEffect(() => {
    initializeStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmployees(loadEmployees());
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const openEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormName(emp.name);
    setFormRole(emp.role);
    setFormMaxHours(String(emp.maxHours));
    setEditDialog(true);
  };

  const openAdd = () => {
    setFormName("");
    setFormRole("");
    setFormMaxHours("35");
    setAddDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingEmployee || !formName.trim() || !formRole) return;
    updateEmployee(editingEmployee.id, {
      name: formName.trim(),
      role: formRole,
      maxHours: parseInt(formMaxHours) || 35,
    });
    setEmployees(loadEmployees());
    setEditDialog(false);
  };

  const handleAdd = () => {
    if (!formName.trim() || !formRole) return;
    addEmployee({
      id: generateId(),
      name: formName.trim(),
      role: formRole,
      maxHours: parseInt(formMaxHours) || 35,
    });
    setEmployees(loadEmployees());
    setAddDialog(false);
  };

  const handleDelete = (id: string) => {
    removeEmployee(id);
    setEmployees(loadEmployees());
    setDeleteConfirm(null);
  };

  const roleStyle = (role: string) =>
    ROLE_COLORS[role] || { bg: "bg-[#4B0F1F]/15", text: "text-[#4B0F1F]" };

  const activeNav = "equipe";

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

        <nav className="flex-1 space-y-2 mt-8 md:mt-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3.5 text-[var(--manoire-beige)]/70 hover:bg-white/10 hover:text-[var(--manoire-beige)] rounded-xl font-medium transition-all duration-200"
          >
            <CalendarDays className="w-5 h-5" />
            Planning
          </Link>
          <Link
            href="/equipe"
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
              activeNav === "equipe"
                ? "bg-white/15 text-white shadow-lg shadow-black/10 backdrop-blur-sm"
                : "text-[var(--manoire-beige)]/70 hover:bg-white/10"
            }`}
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
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)]">
              Gestion de l&apos;Équipe
            </h2>
            <p className="text-[var(--manoire-kaki)] mt-1 text-sm md:text-base">
              {employees.length} membre{employees.length > 1 ? "s" : ""} dans
              l&apos;équipe
            </p>
          </div>
          <Button
            onClick={openAdd}
            className="bg-[var(--manoire-caramel)] hover:bg-[#7a3711] text-white rounded-xl gap-2 shadow-md hover:shadow-lg transition-all px-6 py-5"
          >
            <UserPlus className="w-4 h-4" />
            Ajouter un membre
          </Button>
        </header>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {employees.map((emp) => {
            const colors = roleStyle(emp.role);
            return (
              <div
                key={emp.id}
                className="bg-[var(--manoire-blanc)] rounded-2xl border border-[var(--manoire-beige)]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Color strip */}
                <div
                  className="h-1.5"
                  style={{
                    background:
                      emp.role === "Manager"
                        ? "#954315"
                        : emp.role === "Chef de Rang"
                        ? "#C58632"
                        : emp.role === "Cuisinier" ||
                          emp.role === "Chef Cuistot"
                        ? "#7B694D"
                        : emp.role === "Barman"
                        ? "#C58632"
                        : "#E06530",
                  }}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--manoire-creme)] border-2 border-[var(--manoire-beige)]/50 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md">
                        <span className="text-sm font-bold text-[var(--manoire-bordeaux)]">
                          {getInitials(emp.name)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--manoire-bordeaux)]">
                          {emp.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
                        >
                          {emp.role}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => openEdit(emp)}
                        className="p-2 rounded-lg text-[var(--manoire-kaki)] hover:text-[var(--manoire-caramel)] hover:bg-[var(--manoire-creme)] transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(emp.id)}
                        className="p-2 rounded-lg text-[var(--manoire-kaki)] hover:text-red-600 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--manoire-kaki)]">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                      {emp.maxHours}h / semaine
                    </span>
                  </div>

                  {/* Delete confirmation */}
                  {deleteConfirm === emp.id && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between animate-in fade-in">
                      <span className="text-sm text-red-700 font-medium">
                        Supprimer ?
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteConfirm(null)}
                          className="h-7 text-xs"
                        >
                          Annuler
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(emp.id)}
                          className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white"
                        >
                          Confirmer
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {employees.length === 0 && (
            <div className="col-span-full bg-[var(--manoire-blanc)] rounded-2xl border border-[var(--manoire-beige)]/40 p-12 text-center">
              <Users className="w-12 h-12 text-[var(--manoire-kaki)] mx-auto mb-4 opacity-40" />
              <h3 className="text-lg font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)] mb-2">
                Aucun membre dans l&apos;équipe
              </h3>
              <p className="text-sm text-[var(--manoire-kaki)] mb-6">
                Commencez par ajouter les membres de votre équipe.
              </p>
              <Button
                onClick={openAdd}
                className="bg-[var(--manoire-caramel)] hover:bg-[#7a3711] text-white rounded-xl gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Ajouter un membre
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="bg-[var(--manoire-blanc)] border-[var(--manoire-beige)]/40 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-heading)] text-[var(--manoire-bordeaux)]">
              Modifier le profil
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[var(--manoire-bordeaux)] font-medium">
                Nom
              </Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="border-[var(--manoire-beige)] bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[var(--manoire-bordeaux)] font-medium">
                Poste
              </Label>
              <Select value={formRole} onValueChange={(v) => v && setFormRole(v)}>
                <SelectTrigger className="border-[var(--manoire-beige)] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Chef de Rang">Chef de Rang</SelectItem>
                  <SelectItem value="Serveur">Serveur</SelectItem>
                  <SelectItem value="Cuisinier">Cuisinier</SelectItem>
                  <SelectItem value="Plongeur">Plongeur</SelectItem>
                  <SelectItem value="Barman">Barman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[var(--manoire-bordeaux)] font-medium">
                Heures / semaine
              </Label>
              <Select value={formMaxHours} onValueChange={(v) => v && setFormMaxHours(v)}>
                <SelectTrigger className="border-[var(--manoire-beige)] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="42">42h</SelectItem>
                  <SelectItem value="35">35h</SelectItem>
                  <SelectItem value="20">20h</SelectItem>
                  <SelectItem value="10">Extra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEditDialog(false)}
              className="border-[var(--manoire-beige)] text-[var(--manoire-kaki)] rounded-xl"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[var(--manoire-caramel)] hover:bg-[#7a3711] text-white rounded-xl"
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="bg-[var(--manoire-blanc)] border-[var(--manoire-beige)]/40 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-heading)] text-[var(--manoire-bordeaux)]">
              Ajouter un membre
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[var(--manoire-bordeaux)] font-medium">
                Nom
              </Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Jean Dupont"
                className="border-[var(--manoire-beige)] bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[var(--manoire-bordeaux)] font-medium">
                Poste
              </Label>
              <Select value={formRole} onValueChange={(v) => v && setFormRole(v)}>
                <SelectTrigger className="border-[var(--manoire-beige)] bg-white">
                  <SelectValue placeholder="Sélectionnez un poste" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Chef de Rang">Chef de Rang</SelectItem>
                  <SelectItem value="Serveur">Serveur</SelectItem>
                  <SelectItem value="Cuisinier">Cuisinier</SelectItem>
                  <SelectItem value="Plongeur">Plongeur</SelectItem>
                  <SelectItem value="Barman">Barman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[var(--manoire-bordeaux)] font-medium">
                Heures / semaine
              </Label>
              <Select value={formMaxHours} onValueChange={(v) => v && setFormMaxHours(v)}>
                <SelectTrigger className="border-[var(--manoire-beige)] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="42">42h</SelectItem>
                  <SelectItem value="35">35h</SelectItem>
                  <SelectItem value="20">20h</SelectItem>
                  <SelectItem value="10">Extra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setAddDialog(false)}
              className="border-[var(--manoire-beige)] text-[var(--manoire-kaki)] rounded-xl"
            >
              Annuler
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-[var(--manoire-caramel)] hover:bg-[#7a3711] text-white rounded-xl"
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

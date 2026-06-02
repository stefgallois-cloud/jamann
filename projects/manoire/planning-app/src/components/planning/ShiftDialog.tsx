"use client";

import { useState, useEffect } from "react";
import { Employee, Shift } from "@/lib/mock-data";
import { generateId } from "@/lib/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { format } from "date-fns";

type ShiftDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (shift: Shift) => void;
  employees: Employee[];
  editingShift?: Shift | null;
  defaultDate?: string;
};

export function ShiftDialog({
  open,
  onOpenChange,
  onSave,
  employees,
  editingShift,
  defaultDate,
}: ShiftDialogProps) {
  const isEditing = !!editingShift;

  const [employeeId, setEmployeeId] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens or editingShift changes
  useEffect(() => {
    if (!open) return;

    if (editingShift) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmployeeId(editingShift.employeeId);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDateStr(editingShift.date);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStartTime(editingShift.startTime);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEndTime(editingShift.endTime);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole(editingShift.role);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmployeeId("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDateStr(defaultDate || format(new Date(), "yyyy-MM-dd"));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStartTime("09:00");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEndTime("17:00");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole("");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrors({});
  }, [open, editingShift, defaultDate]);

  // Auto-fill role when employee changes
  useEffect(() => {
    if (!employeeId) return;
    const emp = employees.find((e) => e.id === employeeId);
    if (emp) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRole((prev) => {
        const knownRoles = employees.map((e) => e.role);
        if (!prev || knownRoles.includes(prev)) {
          return emp.role;
        }
        return prev;
      });
    }
  }, [employeeId, employees]);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!employeeId) {
      newErrors.employeeId = "Veuillez sélectionner un employé";
    }
    
    if (!dateStr) {
      newErrors.dateStr = "Date requise";
    }

    if (!startTime) {
      newErrors.startTime = "Heure de début requise";
    }

    if (!endTime) {
      newErrors.endTime = "Heure de fin requise";
    }

    if (startTime && endTime && endTime <= startTime) {
      newErrors.endTime = "L'heure de fin doit être après l'heure de début";
    }

    if (!role.trim()) {
      newErrors.role = "Le rôle est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    const shift: Shift = {
      id: editingShift?.id ?? generateId(),
      employeeId,
      date: dateStr,
      startTime,
      endTime,
      role: role.trim(),
    };

    onSave(shift);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#FBFBF8] border-[#E2BD8C] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-[#4B0F1F] text-lg">
            {isEditing ? "Modifier le shift" : "Ajouter un shift"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Employee select */}
          <div className="grid gap-2">
            <Label className="text-[#4B0F1F] font-medium">Employé</Label>
            <Select value={employeeId} onValueChange={(v) => v && setEmployeeId(v)}>
              <SelectTrigger
                className={`w-full border-[#E2BD8C] bg-white focus-visible:ring-[#954315] ${
                  errors.employeeId ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Sélectionner un employé" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.employeeId && (
              <p className="text-xs text-red-500">{errors.employeeId}</p>
            )}
          </div>

          {/* Date input */}
          <div className="grid gap-2">
            <Label className="text-[#4B0F1F] font-medium">Date</Label>
            <Input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className={`border-[#E2BD8C] bg-white focus-visible:ring-[#954315] ${
                errors.dateStr ? "border-red-500" : ""
              }`}
            />
            {errors.dateStr && (
              <p className="text-xs text-red-500">{errors.dateStr}</p>
            )}
          </div>

          {/* Time inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label className="text-[#4B0F1F] font-medium">Début</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`border-[#E2BD8C] bg-white focus-visible:ring-[#954315] ${
                  errors.startTime ? "border-red-500" : ""
                }`}
              />
              {errors.startTime && (
                <p className="text-xs text-red-500">{errors.startTime}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-[#4B0F1F] font-medium">Fin</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`border-[#E2BD8C] bg-white focus-visible:ring-[#954315] ${
                  errors.endTime ? "border-red-500" : ""
                }`}
              />
              {errors.endTime && (
                <p className="text-xs text-red-500">{errors.endTime}</p>
              )}
            </div>
          </div>

          {/* Role input */}
          <div className="grid gap-2">
            <Label className="text-[#4B0F1F] font-medium">Rôle</Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex: Serveuse, Chef de Rang..."
              className={`border-[#E2BD8C] bg-white focus-visible:ring-[#954315] ${
                errors.role ? "border-red-500" : ""
              }`}
            />
            {errors.role && (
              <p className="text-xs text-red-500">{errors.role}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-[#E2BD8C] text-[#7B694D] hover:bg-[#EFE5DB]/50 rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button
            className="bg-[#954315] hover:bg-[#7a3711] text-white rounded-xl"
            onClick={handleSave}
          >
            {isEditing ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

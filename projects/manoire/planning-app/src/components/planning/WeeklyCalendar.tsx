"use client";

import { useState, useMemo } from "react";
import { Employee, Shift } from "@/lib/mock-data";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { ShiftCard } from "./ShiftCard";
import { ShiftDialog } from "./ShiftDialog";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { fr } from "date-fns/locale";

type WeeklyCalendarProps = {
  employees: Employee[];
  shifts: Shift[];
  onShiftsChange?: (shifts: Shift[]) => void;
};

const DAYS_NAMES = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

function DroppableDay({
  date,
  shifts,
  employees,
  onEdit,
  onDelete,
  onAdd,
}: {
  date: string;
  shifts: Shift[];
  employees: Employee[];
  onEdit: (shift: Shift) => void;
  onDelete: (shiftId: string) => void;
  onAdd: (date: string) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `day-${date}`,
    data: { date },
  });

  return (
    <div
      ref={setNodeRef}
      className={`border-r border-[var(--manoire-beige)]/30 last:border-r-0 p-2 min-h-[450px] transition-colors duration-200 ${
        isOver ? "bg-[var(--manoire-caramel)]/10" : "bg-[var(--manoire-creme)]/30"
      }`}
    >
      <div className="space-y-2.5">
        {shifts.length === 0 ? (
          <div className="text-center text-xs text-[var(--manoire-kaki)]/50 py-6 italic">
            Aucun shift
          </div>
        ) : (
          shifts.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              employee={employees.find((e) => e.id === shift.employeeId)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* Add shift button */}
      <button
        onClick={() => onAdd(date)}
        className="w-full mt-3 py-2 rounded-lg border-2 border-dashed border-[var(--manoire-beige)]/40 text-[var(--manoire-kaki)]/50 hover:border-[var(--manoire-caramel)] hover:text-[var(--manoire-caramel)] hover:bg-[var(--manoire-caramel)]/5 transition-all duration-200 flex items-center justify-center gap-1 text-xs font-medium"
      >
        <Plus className="w-3.5 h-3.5" />
        Ajouter
      </button>
    </div>
  );
}

export function WeeklyCalendar({
  employees,
  shifts,
  onShiftsChange,
}: WeeklyCalendarProps) {
  
  // Date context
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const dateObj = addDays(currentWeekStart, i);
      return {
        name: DAYS_NAMES[i],
        dateStr: format(dateObj, "yyyy-MM-dd"),
        displayDate: format(dateObj, "dd MMM", { locale: fr }),
      };
    });
  }, [currentWeekStart]);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [defaultDate, setDefaultDate] = useState("");

  // Delete confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const updateShifts = (newShifts: Shift[]) => {
    onShiftsChange?.(newShifts);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const shiftId = active.id as string;
    const newDate = over.data.current?.date;

    if (newDate !== undefined) {
      const newShifts = shifts.map((s) =>
        s.id === shiftId ? { ...s, date: newDate } : s
      );
      updateShifts(newShifts);
    }
  };

  const handleAdd = (date: string) => {
    setEditingShift(null);
    setDefaultDate(date);
    setDialogOpen(true);
  };

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift);
    setDefaultDate(shift.date);
    setDialogOpen(true);
  };

  const handleDelete = (shiftId: string) => {
    if (deleteConfirmId === shiftId) {
      // Second click = confirm
      const newShifts = shifts.filter((s) => s.id !== shiftId);
      updateShifts(newShifts);
      setDeleteConfirmId(null);
    } else {
      // First click = ask confirmation (auto-reset after 3s)
      setDeleteConfirmId(shiftId);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  const handleSaveShift = (shift: Shift) => {
    const exists = shifts.find((s) => s.id === shift.id);
    let newShifts: Shift[];
    if (exists) {
      newShifts = shifts.map((s) => (s.id === shift.id ? shift : s));
    } else {
      newShifts = [...shifts, shift];
    }
    updateShifts(newShifts);
  };

  const getShiftsForDate = (dateStr: string) => {
    return shifts
      .filter((s) => s.date === dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Calendar Header / Navigation */}
      <div className="flex items-center justify-between bg-[var(--manoire-blanc)] p-4 rounded-2xl border border-[var(--manoire-beige)]/40 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))}
            className="p-2 rounded-lg text-[var(--manoire-kaki)] hover:bg-[var(--manoire-creme)] hover:text-[var(--manoire-bordeaux)] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--manoire-kaki)] hover:bg-[var(--manoire-creme)] hover:text-[var(--manoire-bordeaux)] transition-colors border border-[var(--manoire-beige)]/50"
          >
            Aujourd&apos;hui
          </button>
          <button 
            onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))}
            className="p-2 rounded-lg text-[var(--manoire-kaki)] hover:bg-[var(--manoire-creme)] hover:text-[var(--manoire-bordeaux)] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-[var(--manoire-bordeaux)]">
          <CalendarIcon className="w-5 h-5 text-[var(--manoire-caramel)]" />
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg capitalize">
            {format(currentWeekStart, "MMMM yyyy", { locale: fr })}
          </h3>
        </div>
      </div>

      <div className="w-full bg-[var(--manoire-blanc)] rounded-2xl border border-[var(--manoire-beige)]/40 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <div className="min-w-[900px] flex flex-col">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-[var(--manoire-beige)]/40 bg-[var(--manoire-bordeaux)]">
              {weekDays.map((day) => (
                <div
                  key={day.dateStr}
                  className="px-2 py-3 text-center border-r border-white/10 last:border-r-0 flex flex-col items-center"
                >
                  <span className="text-xs font-bold text-[var(--manoire-beige)]/70 uppercase tracking-wider">
                    {day.name}
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5">
                    {day.displayDate}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <DndContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-7 flex-1">
                {weekDays.map((day) => (
                  <DroppableDay
                    key={day.dateStr}
                    date={day.dateStr}
                    shifts={getShiftsForDate(day.dateStr)}
                    employees={employees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                  />
                ))}
              </div>
            </DndContext>
          </div>
        </div>
      </div>

      {/* Shift Dialog */}
      <ShiftDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveShift}
        employees={employees}
        editingShift={editingShift}
        defaultDate={defaultDate}
      />
    </div>
  );
}

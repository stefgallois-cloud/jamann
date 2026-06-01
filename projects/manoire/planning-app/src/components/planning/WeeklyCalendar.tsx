"use client";

import { useState } from "react";
import { Employee, Shift } from "@/lib/mock-data";
import { Clock, User } from "lucide-react";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";

type WeeklyCalendarProps = {
  employees: Employee[];
  initialShifts: Shift[];
};

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function DraggableShift({ shift, employee }: { shift: Shift; employee: Employee | undefined }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: shift.id,
    data: { shift }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="bg-white border border-stone-200 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#8b5a2b] bg-[#8b5a2b]/10 px-2 py-0.5 rounded-full">
          {shift.role}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center overflow-hidden">
          {employee?.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-3 h-3 text-stone-500" />
          )}
        </div>
        <span className="font-bold text-sm text-stone-800">{employee?.name || "Inconnu"}</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
        <Clock className="w-3 h-3" />
        {shift.startTime} - {shift.endTime}
      </div>
    </div>
  );
}

function DroppableDay({ dayIndex, shifts, employees }: { dayIndex: number, shifts: Shift[], employees: Employee[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `day-${dayIndex}`,
    data: { dayIndex }
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`border-r border-stone-100 last:border-r-0 p-2 min-h-[500px] transition-colors ${isOver ? 'bg-[#8b5a2b]/10' : 'bg-[#FDFBF7]/30'}`}
    >
      <div className="space-y-3">
        {shifts.length === 0 ? (
          <div className="text-center text-xs text-stone-400 py-4 italic">Aucun shift</div>
        ) : (
          shifts.map(shift => (
            <DraggableShift key={shift.id} shift={shift} employee={employees.find(e => e.id === shift.employeeId)} />
          ))
        )}
      </div>
    </div>
  );
}

export function WeeklyCalendar({ employees, initialShifts }: WeeklyCalendarProps) {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const shiftId = active.id as string;
    const newDayIndex = over.data.current?.dayIndex;

    if (newDayIndex !== undefined) {
      setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, dayOfWeek: newDayIndex } : s));
    }
  };

  const getShiftsForDay = (dayIndex: number) => {
    return shifts.filter(s => s.dayOfWeek === dayIndex).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50">
        {DAYS.map(day => (
          <div key={day} className="px-4 py-3 text-center border-r border-stone-200 last:border-r-0">
            <span className="text-sm font-bold text-stone-700 uppercase tracking-wide">{day}</span>
          </div>
        ))}
      </div>
      
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-7 flex-1">
          {DAYS.map((_, i) => (
            <DroppableDay key={`col-${i}`} dayIndex={i} shifts={getShiftsForDay(i)} employees={employees} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

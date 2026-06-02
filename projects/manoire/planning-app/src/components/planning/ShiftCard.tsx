'use client';

import { Employee, Shift } from '@/lib/mock-data';
import { Clock, User, Pencil, Trash2 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

type ShiftCardProps = {
  shift: Shift;
  employee: Employee | undefined;
  onEdit: (shift: Shift) => void;
  onDelete: (shiftId: string) => void;
};

/**
 * Returns Tailwind classes for the role badge based on employee role.
 */
function getRoleBadgeClasses(role: string): string {
  switch (role) {
    case 'Manager':
      return 'bg-[#954315]/15 text-[#954315]';
    case 'Chef de Rang':
      return 'bg-[#C58632]/15 text-[#C58632]';
    case 'Serveuse':
    case 'Serveur':
      return 'bg-[#E06530]/15 text-[#E06530]';
    case 'Chef Cuistot':
    case 'Cuisinier':
      return 'bg-[#7B694D]/15 text-[#7B694D]';
    default:
      return 'bg-[#4B0F1F]/15 text-[#4B0F1F]';
  }
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export function ShiftCard({ shift, employee, onEdit, onDelete }: ShiftCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: shift.id,
    data: { shift },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.85 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="relative bg-white/80 backdrop-blur-sm border border-[#E2BD8C]/40 p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
    >
      {/* Action buttons — visible on hover */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(shift);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="p-1 rounded-md text-[#7B694D] hover:text-[#954315] hover:bg-[#954315]/10 transition-colors"
          aria-label="Modifier le shift"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(shift.id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="p-1 rounded-md text-[#7B694D] hover:text-red-600 hover:bg-red-600/10 transition-colors"
          aria-label="Supprimer le shift"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Role badge */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleBadgeClasses(shift.role)}`}
        >
          {shift.role}
        </span>
      </div>

      {/* Employee info */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-[#EFE5DB] border border-[#E2BD8C] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-sm">
          {employee?.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          ) : employee ? (
            <span className="text-[10px] font-bold text-[#4B0F1F]">
              {getInitials(employee.name)}
            </span>
          ) : (
            <User className="w-3 h-3 text-[#7B694D]" />
          )}
        </div>
        <span className="font-semibold text-sm text-[#4B0F1F] transition-colors duration-300 group-hover:text-[#954315]">
          {employee?.name || 'Inconnu'}
        </span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1.5 text-xs text-[#7B694D] font-medium">
        <Clock className="w-3 h-3" />
        {shift.startTime} – {shift.endTime}
      </div>
    </div>
  );
}

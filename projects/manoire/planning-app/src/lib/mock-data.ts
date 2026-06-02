import { startOfWeek, addDays, format } from "date-fns";

export type Employee = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  maxHours: number;
};

export type Shift = {
  id: string;
  employeeId: string;
  date: string; // Format: "yyyy-MM-dd"
  startTime: string; // ex: "09:00"
  endTime: string;   // ex: "15:00"
  role: string;
};

export const MOCK_EMPLOYEES: Employee[] = [
  { id: "e1", name: "Stéphanie", role: "Manager", maxHours: 42 },
  { id: "e2", name: "Julien", role: "Chef de Rang", maxHours: 35 },
  { id: "e3", name: "Léa", role: "Serveuse", maxHours: 35 },
  { id: "e4", name: "Marc", role: "Chef Cuistot", maxHours: 42 },
  { id: "e5", name: "Sophie", role: "Plongeuse", maxHours: 20 },
];

// Helper to get dates for the current week (Monday as start)
const today = new Date();
const monday = startOfWeek(today, { weekStartsOn: 1 });

const getDayDate = (dayOffset: number) => {
  return format(addDays(monday, dayOffset), "yyyy-MM-dd");
};

export const MOCK_SHIFTS: Shift[] = [
  // Lundi (offset 0)
  { id: "s1", employeeId: "e1", date: getDayDate(0), startTime: "09:00", endTime: "18:00", role: "Manager" },
  { id: "s2", employeeId: "e2", date: getDayDate(0), startTime: "10:00", endTime: "15:00", role: "Chef de Rang" },
  { id: "s3", employeeId: "e3", date: getDayDate(0), startTime: "18:00", endTime: "22:00", role: "Serveuse" },
  { id: "s4", employeeId: "e4", date: getDayDate(0), startTime: "09:00", endTime: "15:00", role: "Chef Cuistot" },
  { id: "s5", employeeId: "e4", date: getDayDate(0), startTime: "18:00", endTime: "22:00", role: "Chef Cuistot" },
  { id: "s6", employeeId: "e5", date: getDayDate(0), startTime: "12:00", endTime: "16:00", role: "Plongeuse" },
  
  // Mardi (offset 1)
  { id: "s7", employeeId: "e1", date: getDayDate(1), startTime: "10:00", endTime: "22:00", role: "Manager" },
  { id: "s8", employeeId: "e2", date: getDayDate(1), startTime: "10:00", endTime: "15:00", role: "Chef de Rang" },
  { id: "s9", employeeId: "e3", date: getDayDate(1), startTime: "10:00", endTime: "15:00", role: "Serveuse" },
  
  // Vendredi (offset 4)
  { id: "s10", employeeId: "e1", date: getDayDate(4), startTime: "09:00", endTime: "18:00", role: "Manager" },
  { id: "s11", employeeId: "e2", date: getDayDate(4), startTime: "18:00", endTime: "22:00", role: "Chef de Rang" },
  { id: "s12", employeeId: "e3", date: getDayDate(4), startTime: "18:00", endTime: "22:00", role: "Serveuse" },
  { id: "s13", employeeId: "e4", date: getDayDate(4), startTime: "09:00", endTime: "15:00", role: "Chef Cuistot" },
  { id: "s14", employeeId: "e4", date: getDayDate(4), startTime: "18:00", endTime: "22:00", role: "Chef Cuistot" },
];

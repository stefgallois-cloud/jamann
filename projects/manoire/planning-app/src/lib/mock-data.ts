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
  dayOfWeek: number; // 0 = Lundi, 6 = Dimanche (pour simplification du mock)
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

export const MOCK_SHIFTS: Shift[] = [
  { id: "s1", employeeId: "e1", dayOfWeek: 0, startTime: "09:00", endTime: "18:00", role: "Manager" },
  { id: "s2", employeeId: "e2", dayOfWeek: 0, startTime: "10:00", endTime: "15:00", role: "Chef de Rang" },
  { id: "s3", employeeId: "e3", dayOfWeek: 0, startTime: "18:00", endTime: "22:00", role: "Serveuse" },
  { id: "s4", employeeId: "e4", dayOfWeek: 0, startTime: "09:00", endTime: "15:00", role: "Chef Cuistot" },
  { id: "s5", employeeId: "e4", dayOfWeek: 0, startTime: "18:00", endTime: "22:00", role: "Chef Cuistot" },
  { id: "s6", employeeId: "e5", dayOfWeek: 0, startTime: "12:00", endTime: "16:00", role: "Plongeuse" },
  
  { id: "s7", employeeId: "e1", dayOfWeek: 1, startTime: "10:00", endTime: "22:00", role: "Manager" },
  { id: "s8", employeeId: "e2", dayOfWeek: 1, startTime: "10:00", endTime: "15:00", role: "Chef de Rang" },
  { id: "s9", employeeId: "e3", dayOfWeek: 1, startTime: "10:00", endTime: "15:00", role: "Serveuse" },
  
  { id: "s10", employeeId: "e1", dayOfWeek: 4, startTime: "09:00", endTime: "18:00", role: "Manager" },
  { id: "s11", employeeId: "e2", dayOfWeek: 4, startTime: "18:00", endTime: "22:00", role: "Chef de Rang" },
  { id: "s12", employeeId: "e3", dayOfWeek: 4, startTime: "18:00", endTime: "22:00", role: "Serveuse" },
  { id: "s13", employeeId: "e4", dayOfWeek: 4, startTime: "09:00", endTime: "15:00", role: "Chef Cuistot" },
  { id: "s14", employeeId: "e4", dayOfWeek: 4, startTime: "18:00", endTime: "22:00", role: "Chef Cuistot" },
];

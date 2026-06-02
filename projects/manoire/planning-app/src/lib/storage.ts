import { Employee, Shift } from './mock-data';
import { MOCK_EMPLOYEES, MOCK_SHIFTS } from './mock-data';

const STORAGE_KEYS = {
  SHIFTS: 'manoire-shifts-v2',
  EMPLOYEES: 'manoire-employees',
  INITIALIZED: 'manoire-initialized-v2',
} as const;

/**
 * Initialize storage with mock data if this is the first visit.
 * Safe to call multiple times — only seeds data once.
 */
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (initialized) return;

  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(MOCK_EMPLOYEES));
  localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(MOCK_SHIFTS));
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
}

/**
 * Load shifts from localStorage.
 * Falls back to mock data if nothing is stored.
 */
export function loadShifts(): Shift[] {
  if (typeof window === 'undefined') return MOCK_SHIFTS;

  const raw = localStorage.getItem(STORAGE_KEYS.SHIFTS);
  if (!raw) return MOCK_SHIFTS;

  try {
    return JSON.parse(raw) as Shift[];
  } catch {
    return MOCK_SHIFTS;
  }
}

/**
 * Save shifts to localStorage.
 */
export function saveShifts(shifts: Shift[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
}

/**
 * Load employees from localStorage.
 * Falls back to mock data if nothing is stored.
 */
export function loadEmployees(): Employee[] {
  if (typeof window === 'undefined') return MOCK_EMPLOYEES;

  const raw = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
  if (!raw) return MOCK_EMPLOYEES;

  try {
    return JSON.parse(raw) as Employee[];
  } catch {
    return MOCK_EMPLOYEES;
  }
}

/**
 * Save employees to localStorage.
 */
export function saveEmployees(employees: Employee[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
}

/**
 * Add a single employee and persist.
 * Returns the updated list.
 */
export function addEmployee(employee: Employee): Employee[] {
  const employees = loadEmployees();
  employees.push(employee);
  saveEmployees(employees);
  return employees;
}

/**
 * Remove an employee by ID and persist.
 * Returns the updated list.
 */
export function removeEmployee(id: string): Employee[] {
  const employees = loadEmployees().filter((e) => e.id !== id);
  saveEmployees(employees);
  return employees;
}

/**
 * Update an employee by ID with partial fields and persist.
 * Returns the updated list.
 */
export function updateEmployee(id: string, updates: Partial<Employee>): Employee[] {
  const employees = loadEmployees().map((e) =>
    e.id === id ? { ...e, ...updates } : e
  );
  saveEmployees(employees);
  return employees;
}

/**
 * Add a single shift and persist.
 * Returns the updated list.
 */
export function addShift(shift: Shift): Shift[] {
  const shifts = loadShifts();
  shifts.push(shift);
  saveShifts(shifts);
  return shifts;
}

/**
 * Remove a shift by ID and persist.
 * Returns the updated list.
 */
export function removeShift(id: string): Shift[] {
  const shifts = loadShifts().filter((s) => s.id !== id);
  saveShifts(shifts);
  return shifts;
}

/**
 * Update a shift by ID with partial fields and persist.
 * Returns the updated list.
 */
export function updateShift(id: string, updates: Partial<Shift>): Shift[] {
  const shifts = loadShifts().map((s) =>
    s.id === id ? { ...s, ...updates } : s
  );
  saveShifts(shifts);
  return shifts;
}

/**
 * Generate a unique ID using crypto.randomUUID with a prefix.
 * Falls back to a timestamp-based ID in environments without crypto.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `id-${crypto.randomUUID()}`;
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Reset storage to the original mock data.
 * Clears the initialized flag and re-seeds.
 */
export function resetStorage(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  localStorage.removeItem(STORAGE_KEYS.SHIFTS);
  localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
  initializeStorage();
}

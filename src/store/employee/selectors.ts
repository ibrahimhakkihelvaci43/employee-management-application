import { RootState } from '../store';
import { Employee } from './types';

export const getEmployees = (state: RootState): Employee[] => {
  return state.employee.employees;
};

export const getEmployeeById = (state: RootState, id: string): Employee | undefined => {
  return state.employee.employees.find((employee: Employee) => employee.id === id);
};

export const getEmployeesLoading = (state: RootState): boolean => {
  return state.employee.loading;
};

export const getEmployeesError = (state: RootState): string | null => {
  return state.employee.error;
};

export const getEmployeesByDepartment = (state: RootState, department: string): Employee[] => {
  return state.employee.employees.filter((employee: Employee) => employee.department === department);
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeState } from './types';
import { mockEmployees } from '../../data/mockEmployees';

const initialState: EmployeeState = {
  employees: mockEmployees,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 5,
  totalCount: mockEmployees.length,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newEmployee: Employee = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.employees.push(newEmployee);
      state.totalCount = state.employees.length;
    },
    
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(
        (employee: Employee) => employee.id !== action.payload
      );
      state.totalCount = state.employees.length;
    },
    
    editEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (employee: Employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    deleteMultipleEmployees: (state, action: PayloadAction<string[]>) => {
      state.employees = state.employees.filter(
        (employee: Employee) => !action.payload.includes(employee.id)
      );
      state.totalCount = state.employees.length;
    },
  },
});

export const {
  createEmployee,
  deleteEmployee,
  editEmployee,
  setLoading,
  setCurrentPage,
  setError,
  deleteMultipleEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;

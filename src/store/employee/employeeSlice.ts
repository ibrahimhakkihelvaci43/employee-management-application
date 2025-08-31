import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeState } from './types';

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newEmployee: Employee = {
        ...action.payload,
        id: Date.now().toString(), // Simple ID generation
      };
      state.employees.push(newEmployee);
    },
    
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(
        (employee: Employee) => employee.id !== action.payload
      );
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
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  createEmployee,
  deleteEmployee,
  editEmployee,
  setLoading,
  setError,
} = employeeSlice.actions;

export default employeeSlice.reducer;

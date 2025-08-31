import { Employee } from '../store/employee/types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    dateOfEmployment: '2023-01-15',
    dateOfBirth: '1990-05-20',
    phone: '5551234567',
    email: 'ahmet.yilmaz@company.com',
    department: 'Yazılım Geliştirme',
    position: 'senior'
  },
  {
    id: '2',
    firstName: 'Ayşe',
    lastName: 'Kaya',
    dateOfEmployment: '2023-03-10',
    dateOfBirth: '1992-08-14',
    phone: '5559876543',
    email: 'ayse.kaya@company.com',
    department: 'İnsan Kaynakları',
    position: 'mid'
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Demir',
    dateOfEmployment: '2024-06-01',
    dateOfBirth: '1995-12-03',
    phone: '5555555555',
    email: 'mehmet.demir@company.com',
    department: 'Pazarlama',
    position: 'junior'
  },
  {
    id: '4',
    firstName: 'Fatma',
    lastName: 'Öztürk',
    dateOfEmployment: '2022-09-20',
    dateOfBirth: '1988-03-25',
    phone: '5551111111',
    email: 'fatma.ozturk@company.com',
    department: 'Muhasebe',
    position: 'senior'
  }
];

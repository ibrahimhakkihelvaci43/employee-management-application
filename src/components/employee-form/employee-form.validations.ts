import * as Yup from 'yup';
import { ValidationPatterns } from '../../utils/validation';

export const employeeFormValidationSchema = Yup.object({
    firstName: Yup.string()
        .required('Ad gereklidir')
        .min(2, 'En az 2 karakter olmalıdır'),

    lastName: Yup.string()
        .required('Soyad gereklidir')
        .min(2, 'En az 2 karakter olmalıdır'),

    dateOfEmployment: Yup.string()
        .required('İşe başlama tarihi gereklidir'),

    dateOfBirth: Yup.string()
        .required('Doğum tarihi gereklidir'),

    phone: Yup.string()
        .required('Telefon gereklidir')
        .matches(ValidationPatterns.phone, 'Geçerli telefon numarası giriniz')
        .min(10, 'Telefon numarası en az 10 karakter olmalıdır'),

    email: Yup.string()
        .required('Email gereklidir')
        .matches(ValidationPatterns.email, 'Geçerli email adresi giriniz'),

    department: Yup.string()
        .required('Departman gereklidir'),

    position: Yup.string()
        .required('Pozisyon gereklidir')

});

export const positionOptions = [
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid-Level' },
    { value: 'senior', label: 'Senior' }
];

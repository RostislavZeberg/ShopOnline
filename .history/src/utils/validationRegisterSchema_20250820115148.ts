import { z } from 'zod';

// Схема для имени и фамилии (не пустые строки)
const nameSchema = z.string().min(1, { message: 'Поле обязательно для заполнения' });

// Схема для телефона (маска +7-000-000-0000)
const phoneSchema = z.string()
  .regex(/^\+7-\d{3}-\d{3}-\d{4}$/, { message: 'Номер телефона должен соответствовать формату +7-000-000-0000' });

// Схема для email
const emailSchema = z.string().email({ message: 'Некорректный email' });

// Схема для пароля
const passwordSchema = z.string()
  .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
  .regex(/[A-Za-z]/, { message: 'Пароль должен содержать хотя бы одну букву' })
  .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' });

// Схема для регистрации
export const registrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(), 
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'], 
});

// Тип для данных регистрации
export type RegistrationFormData = z.infer<typeof registrationSchema>;
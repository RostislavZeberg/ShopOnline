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
  .min(8, { message: 'Пароль должен содержать не менее 8 символов' })
  .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
  .regex(/[a-z]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
  .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
  .regex(/[^A-Za-z0-9]/, { message: 'Пароль должен содержать хотя бы один специальный символ' });

// Схема для регистрации
export const registrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(), // Новое поле для повторного ввода пароля
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'], // Указываем, что ошибка относится к полю confirmPassword
});

// Тип для данных регистрации
export type RegistrationFormData = z.infer<typeof registrationSchema>;
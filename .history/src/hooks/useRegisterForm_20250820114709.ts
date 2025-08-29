import { useState } from 'react';
import { z, ZodError } from 'zod';

export const useRegisterForm = <T extends Record<string, any>>(
  initialValues: T,
  schema: z.ZodSchema<T>
) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // сброс ошибки при изменении поля
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
  };
};
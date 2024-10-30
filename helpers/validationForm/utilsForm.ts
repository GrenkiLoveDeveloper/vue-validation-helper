import { FormFieldState } from '@/types/form';
/**
 * Проверка валидности поля
 * @param form - объект с фильтрами
 * @param fieldName - имя поля
 */
export const checkFieldValidate = (form: FormFieldState, fieldName: string): boolean => {
  const field = form[fieldName];
  return !field.valid && field.touched;
};

/**
 * Преобразуем объект формы в массив за исключением valid
 *
 * @param form
 * @returns
 */
export const formToArray = (form: FormFieldState): [string, FormFieldState][] => {
  return Object.entries(form).filter(([key]) => key !== 'valid');
};

/**
 * Проверяем если значение валидное не пустое
 */
export const isEmpty = (value: any): boolean => {
  switch (true) {
    case value == null || value === undefined:
      return true;
    case typeof value === 'string' || Array.isArray(value):
      return value.length === 0;
    case typeof value === 'object':
      if (value instanceof Date) {
        return false;
      }
      return Object.keys(value).length === 0;
    default:
      // Проверка на ложные значения, такие как false, 0, NaN и т.д.
      return !value;
  }
};

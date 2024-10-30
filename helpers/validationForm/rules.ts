import { defineStore } from 'pinia';

interface IRules {
  required: (val: unknown) => boolean;
  html: (val: unknown) => boolean;
  minLength: (num: number) => (val: unknown) => boolean;
  email: (val: unknown) => boolean;
  maxLength: (num: number) => (val: unknown) => boolean;
}

// Возвращает сообщение об ошибке валидации
export const getErrorMessage = (validatorName: string): string => {
  const messages: { [key: string]: string } = {
    required: 'Это поле обязательно для заполнения',
    html: 'HTML теги не допускаются',
    minLength: 'Строка слишком короткая',
    email: 'Некорректный email адрес',
    maxLength: 'Строка слишком длинная',
  };
  return messages[validatorName] || 'Ошибка валидации.';
};

export const useRules = defineStore('rules', (): IRules => {
  /**
   * Обязательное поле
   *
   * @param val
   * @returns
   */
  const required = (val: unknown): boolean => {
    switch (typeof val) {
      case 'string':
        return !!val && val.length > 0;
      case 'object':
        if (Array.isArray(val)) {
          return val.length > 0;
        }
        return val !== null && Object.keys(val).length > 0;
      case 'number':
        return !isNaN(val);
      case 'boolean':
        return val === true;
      default:
        return !!val;
    }
  };
  /**
   * Проверка на наличие тегов
   *
   * @param val
   * @returns
   */
  const html = (val: unknown): boolean => typeof val === 'string' && val.replace(/<\/?[^>]+>/gi, '').length > 0;

  /**
   * Минимальная длина строки
   *
   * @param num
   */
  const minLength =
    (num: number) =>
    (val: unknown): boolean =>
      typeof val === 'string' && (val === '' || val.length >= num);

  /**
   * Максимальная длина строки
   *
   * @param num
   */
  const maxLength =
    (num: number) =>
    (val: unknown): boolean =>
      typeof val === 'string' && val.length <= num;

  /**
   * Проверка на валидность email
   *
   * @param val
   * @returns
   */
  const email = (val: unknown): boolean => typeof val === 'string' && (val === '' || /\S+@\S+\.\S+/.test(val));

  return { required, minLength, html, email, maxLength };
});

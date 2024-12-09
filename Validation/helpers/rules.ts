import { defineStore } from "pinia";

interface IRules {
  required: (val: unknown) => boolean;
  isNoEmptyHtml: (val: unknown) => boolean;
  minLength: (num: number) => (val: unknown) => boolean;
  email: (val: unknown) => boolean;
  maxLength: (num: number) => (val: unknown) => boolean;
  isNumber: (val: unknown) => boolean;
  isUnique: (
    data: Array<object | string | number>
  ) => (val: unknown) => boolean;
}

/**
 * Возвращает сообщение об ошибке валидации
 *
 * @param validatorName {string}
 * @returns {string}
 */
export const getErrorMessage = (validatorName: string): string => {
  const messages: { [key: string]: string } = {
    required: "Это поле обязательно для заполнения",
    isNoEmptyHtml: "Это поле обязательно для заполнения",
    minLength: "Строка слишком короткая",
    email: "Некорректный email адрес",
    maxLength: "Строка слишком длинная",
    isNumber: "Должно быть числом",
    isUnique: "Значение должно быть уникальным",
  };
  return messages[validatorName] || "Ошибка валидации.";
};

export const useRules = defineStore("rules", (): IRules => {
  /**
   * Обязательное поле
   *
   * @param val
   * @returns
   */
  const required = (val: unknown): boolean => {
    switch (typeof val) {
      case "string":
        return !!val && val.length > 0;
      case "object":
        if (Array.isArray(val)) {
          return val.length > 0;
        }
        return val !== null && Object.keys(val).length > 0;
      case "number":
        return !isNaN(val);
      case "boolean":
        return val === true;
      default:
        return !!val;
    }
  };
  /**
   * Проверка на наличие пустоты в html тегах
   *
   * @param val
   * @returns
   */
  const isNoEmptyHtml = (val: unknown): boolean =>
    typeof val === "string" && val.replace(/<\/?[^>]+>/gi, "").length > 0;

  /**
   * Минимальная длина строки
   *
   * @param num
   */
  const minLength =
    (num: number) =>
    (val: unknown): boolean =>
      typeof val === "string" && (val === "" || val.length >= num);

  /**
   * Максимальная длина строки
   *
   * @param num
   */
  const maxLength =
    (num: number) =>
    (val: unknown): boolean =>
      typeof val === "string" && val.length <= num;

  /**
   * Проверка на валидность email
   *
   * @param val
   * @returns
   */
  const email = (val: unknown): boolean =>
    typeof val === "string" && (val === "" || /\S+@\S+\.\S+/.test(val));

  /**
   * Проверка значения на принадлежность к `number`
   *
   * @param val
   */
  const isNumber = (val: unknown): boolean => !isNaN(Number(val));

  /**
   * Проверка на уникальность значения в массиве
   *
   * @param data
   */
  const isUnique =
    (data: Array<object | string | number>) =>
    (val: unknown): boolean =>
      !data.some((item) => item === val);

  return {
    required,
    minLength,
    isNoEmptyHtml,
    email,
    maxLength,
    isNumber,
    isUnique,
  };
});

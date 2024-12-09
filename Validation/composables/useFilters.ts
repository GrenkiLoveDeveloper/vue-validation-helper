import { ParamsObject } from "@/helpers/ParamsObjBuilder";
import { isEmpty } from "@/modules/Validation/helpers/utilsForm";
import { FormFieldState, FormLabel } from "@/modules/Validation/types/form";

export const useFilters = () => {
  /**
   *  Проверка корректности фильтров
   *
   * @param form FormFieldState
   * @param currentFormToArray
   * @param labels
   * @returns boolean - Возвращает true, если фильтры валидны; иначе false
   */
  const checkFiltersValid = (
    form: FormFieldState,
    currentFormToArray: [string, FormFieldState][],
    labels: FormLabel
  ): boolean => {
    if (!form.valid) {
      /** Показывает уведомление о том, какое поле невалидно */
      notifyFilterErrors(currentFormToArray, labels);
      return false;
    }

    return true;
  };

  /**
   * (находим) валидные фильтры и преобразуем в объект (остаются только валидные фильтры)
   */
  const transformValidFilters = (
    filtersToArray: [string, FormFieldState][]
  ): ParamsObject => {
    return filtersToArray.reduce((acc: ParamsObject, [key, { value }]) => {
      /** Проверяем если значение валидное не пустое */
      if (!isEmpty(value)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  /**
   * Функция для обработки и уведомления об ошибках фильтров
   */
  const notifyFilterErrors = (
    filtersToArray: [string, FormFieldState][],
    labels: FormLabel
  ): void => {
    for (const [key, value] of filtersToArray) {
      if (value?.errors?.message?.length > 0) {
        const messageError = `«${
          labels[key]
        }» ${value.errors.message.toLowerCase()}`;

        /** сюда можно вставить уведомление ошибки */
        console.log(messageError);
        break;
      }
    }
  };

  return {
    transformValidFilters,
    notifyFilterErrors,
    checkFiltersValid,
  };
};

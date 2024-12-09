/**
 * Функция для работы с формой и полями
 *
 * Возаращает объект с полями формы и общее свойство valid, указывающее на валидность всей формы
 */
import { computed, reactive } from "vue";
import { useField } from "./field";
import {
  IUseFormParams,
  FormFieldState,
  FieldState,
} from "@/modules/Validation/types/form";

/**
 * Хук для работы с формой и полями
 *
 * @param init {IUseFormParams}
 * @returns FormFieldState
 */
export const useForm = (init: IUseFormParams): FormFieldState => {
  const form = reactive<FormFieldState>({});

  // Создание полей формы
  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  /**
   * Функция для проверки наличия ключа valid
   *
   * @param k {string}
   * @returns boolean
   */
  const withoutValid = (k: string): boolean => k !== "valid";

  //Проверка на валидность формы (всех полей)
  form.valid = computed(() => {
    return !Object.keys(form)
      .filter(withoutValid)
      .some((k) => {
        return (form[k] as FieldState).valid === false;
      });
  });

  return form;
};

import { ref, reactive, watch } from "vue";
import { IField, FieldErrors, FieldState } from "@/types/form";
import { getErrorMessage } from "./rules";

const not = (val: boolean): boolean => !val;

/**
 *  Обновление ошибки
 *
 * @param errors
 * @param name
 * @param isValid
 * @param errorMessage
 */
const updateError = (
  errors: FieldErrors,
  name: string,
  isValid: boolean,
  errorMessage: string
) => {
  errors[name] = {
    flag: not(isValid),
    message: errorMessage,
  };
};

/**
 * Валидация поля
 *
 * @param field
 * @param val
 * @param errors
 * @param valid
 */
const validateField = (
  field: IField,
  val: unknown,
  errors: FieldErrors,
  valid: { value: boolean }
) => {
  valid.value = true;
  errors.message = "";
  Object.keys(field.validators ?? {}).forEach((name) => {
    if (field.validators) {
      const isValid = field.validators[name](val);
      const errorMessage = not(isValid) ? getErrorMessage(name) : "";

      updateError(errors, name, isValid, errorMessage);

      if (not(isValid)) {
        valid.value = false;
        errors.message = errorMessage;
      }
    }
  });
};

/**
 * Хук для работы с полем формы
 *
 * @param field
 */
export const useField = (field: IField): FieldState => {
  const valid = ref(true);
  const value = ref(field.value);
  const touched = ref(false);
  let errors = reactive<FieldErrors>({});

  // Проверка поля
  const reassign = (val: unknown): void => {
    validateField(field, val, errors, valid);
  };

  watch(value, reassign);
  reassign(field.value);

  return { value, valid, errors, touched, blur: () => (touched.value = true) };
};

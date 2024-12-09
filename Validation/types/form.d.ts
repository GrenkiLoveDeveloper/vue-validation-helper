import { ComputedGetter, Ref } from "vue";

/** Интерфейс для поля формы (параметр для useField хука) */
interface IField {
  value: unknown;
  validators?: Record<string, (val: unknown) => boolean>; // объект с валидаторами
}

/** Интерфейс для параметров useForm хука*/
interface IUseFormParams {
  [key: string]: IField;
}

interface FieldErrors {
  [key: string]: { flag: boolean; message: string };
  message?: string;
}
/** Тип для состояния поля формы */
type FieldState = {
  value: unknown; // значение поля
  valid: Ref<boolean> | boolean; // флаг валидности поля
  errors: FieldErrors; // объект с ошибками поля
  touched: Ref<boolean>; // флаг, указывающий на то, что поле было изменено
  blur: () => void; // функция для установки флага touched
};

/** Тип возвращаемого значения useForm хука , состояние формы и геттер валидности формы (свойство valid)*/
type FormFieldState = {
  [key: string]: FieldState | ComputedGetter;
};

type FormLabel = Record<string, string>;

export {
  IUseFormParams,
  IField,
  FieldErrors,
  FieldState,
  FormFieldState,
  FormLabel,
};

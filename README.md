# vue-validation-helper

my custom validatation for vue

# Vue Validation Helper

Кастомный хелпер вполне может стать хорошей и гибкой библиотекой, моя альтернатива существующим библиотекам для валидации форм и фильтров

на основе `Vue`. Включает набор методов и правил валидации для удобного управления состоянием форм и фильтрацией.

## Установка

Чтобы добавить в проект можно загрузить validationForm соттвественно в папку src/helpers и src/types для типов формы

```
src/
├── helpers/
│   └── validationForm
│
└── types/
    └── form.d.ts
```

## Прменение

Например можно создать store (Pinia) и сделать так:

```
import { defineStore } from 'pinia';

//**helpers */
import { useForm } from '@/helpers/validationForm/form';
import { useRules } from '@/helpers/validationForm/rules';
import { checkFieldValidate, formToArray } from '@/helpers/validationForm/utilsForm';

//**types */
import { FormFieldState, FormLabel } from '@/types/form';

// Получение правил валидации
const { minLength, email, maxLength, required } = useRules();

export const useUserFormStore = defineStore('userForm', () => {
  const form = useForm({
    username: { value: '', validators: { required } },
    email: { value: '', validators: { email, maxLength: maxLength(50) } },
    password: { value: '', validators: { minLength: minLength(5), required } },
  });

  /**
   * Проверка валидности поля
   * @param fieldName - имя поля
   */
  const isFieldValid = (fieldName: string) => {
    return checkFieldValidate(form, fieldName);
  };

  return {
    form,
    isFieldValid,
    formToArray,
  };
});

```

После настройки Pinia-хранилища можно использовать компонент, например, DefaultField, для работы с валидацией конкретного поля

```
<template>
  <DefaultField
    v-model="form.email.value"
    :label="labels.email"
    :type="'email'"
    :valid="isFieldValid('email')"
    @blur="form.email.blur()"
  />
</template>

<script setup>
import { useUserFormStore } from '@/stores/userForm';

const { form, isFieldValid } = useUserFormStore();

const labels = {
  email: 'Электронная почта',
};
</script>
```

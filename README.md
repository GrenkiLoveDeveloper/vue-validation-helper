# vue-validation-helper

my custom validatation for vue

# Vue Validation Helper

Vue Validation Helper — это кастомное решение для валидации форм и фильтров на основе Vue 3. В отличие от существующих библиотек, это решение предлагает гибкость и простоту настройки. Поддерживает валидацию полей и форм, обработку ошибок и уведомлений, а также включает набор готовых правил валидации (например, required, email, minLength, а так же вы можете добавить свое любое правило)

## Установка

У вас должна быть установлена Pinia
Установите Pinia, если ещё не установили:
```
npm install pinia
```

Я использую модульную архитектуру, если вы тоже можете сделать так:


```
src/
├── modules/
│    └── Validation/
│         ├── composables/
│         │     └── useFilters.ts       // Логика проверки фильтров
│         ├── helpers/
│         │     ├── form.ts             // Хук для работы с формой
│         │     ├── rules.ts            // Готовые правила валидации
│         │     └── utilsForm.ts        // Утилиты для работы с формами
│         ├── types/
│         │     └── form.ts             // Типы для формы и полей

```

Или раскидать по папкам composables, helpers, types соотвественно

## Прменение

Пример подключения всех модулей в одном компоненте

Вы можете подключить все необходимые функции одним блоком.
Пример удобного подключения модулей:

```
/** Валидация */
import { FormFieldState } from '@/modules/Validation/types/form';
import { useForm } from '@/modules/Validation/helpers/form';
import { useRules } from '@/modules/Validation/helpers/rules';
import { formToArray } from '@/modules/Validation/helpers/utilsForm';
import { useFilters } from '@/modules/Validation/composables/useFilters';

const { transformValidFilters, checkFiltersValid } = useFilters();
const { required, isNoEmptyHtml } = useRules();
```

```
/** Создаём форму */
const form = useForm({
  name: {
    value: '',
    validators: {
      required,
      minLength: minLength(4)
    }
  },
  email: {
    value: '',
    validators: {
      required,
      email: true
    }
  },
  description: {
    value: '',
    validators: {
      isNoEmptyHtml
    }
  }
});
```
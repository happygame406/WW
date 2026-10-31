# TaskFlow 📋

Канбан-доска для управления задачами, написанная на React, TypeScript и Vite. 
Поддерживает создание колонок, добавление, редактирование, удаление и перемещение задач между колонками. Данные сохраняются в LocalStorage браузера.

## 🛠 Стек технологий

- **React 19** + **TypeScript**
- **Vite 8** (сборщик)
- **Zustand** (управление состоянием)
- **SCSS Modules** (стилизация)
- **Oxlint** (линтер)

## ⚙️ Требования

Для запуска проекта на вашем компьютере должен быть установлен **Node.js** версии **20.19.0** или **22.12.0** и выше, а также пакетный менеджер **npm**.

Проверить версии можно командами:
```bash
node -v
npm -v
```
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

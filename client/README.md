# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


```
src/
│
├── assets/               # Static assets (images, icons, etc.)
├── components/           # Reusable UI components (buttons, modals, inputs)
├── features/             # Feature-based modules (auth, dashboard, api, etc.)
├── pages/                # Page components (usually tied to routes)
├── layouts/              # Shared layouts (auth layout, dashboard layout)
├── routes/               # Route definitions and route guards
├── hooks/                # Custom React hooks
├── context/              # Global state using React Context API
├── lib/                  # External libraries, config, API handlers
├── utils/                # Helper functions (validation, formatting, etc.)
├── constants/            # Static data, enums, config constants
├── types/                # TypeScript types or JSDoc types
├── styles/               # Global CSS / Tailwind config
└── main.tsx              # Entry point
└── App.tsx               # App component with Router setup


components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── Avatar.tsx
├── shared/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx



features/
├── auth/
│   ├── components/      # Auth-specific components (e.g., AuthForm)
│   ├── services.ts      # API calls
│   ├── authSlice.ts     # Redux or Zustand slice (if used)
│   └── index.tsx        # Export or route entry point

├── dashboard/
│   ├── components/
│   ├── services.ts
│   └── index.tsx

├── api/
│   ├── components/
│   ├── services.ts
│   └── index.tsx


pages/
├── Home.tsx
├── Login.tsx
├── Register.tsx
├── Dashboard.tsx
├── Error404.tsx
├── ErrorBoundary.tsx


layouts/
├── AuthLayout.tsx       # Minimal layout for auth pages
├── DashboardLayout.tsx  # Sidebar + Navbar for logged-in users
└── MainLayout.tsx       # Default layout for home and public pages


routes/
├── index.tsx            # All route definitions
├── PrivateRoute.tsx     # Auth-guarded routes
└── PublicRoute.tsx


hooks/
├── useAuth.ts
├── useDebounce.ts
├── useScroll.ts
├── useToggle.ts


context/
├── AuthContext.tsx
├── ThemeContext.tsx
└── APIProvider.tsx


lib/
├── axios.ts             # Axios instance
├── fetcher.ts           # SWR or custom fetch
├── auth.ts              # JWT decode, token checks
└── shadcn-ui.ts         # Custom wrapper config for shadcn


utils/
├── validateEmail.ts
├── formatDate.ts
├── slugify.ts
└── getInitials.ts


constants/
├── routes.ts
├── roles.ts
├── api.ts
└── messages.ts


types/
├── user.d.ts
├── api.d.ts
├── auth.d.ts







```


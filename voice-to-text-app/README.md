# VoiceToCode: React + Vite

This project provides a modern, minimal setup for building advanced voice-driven applications using React and Vite. It features hot module replacement (HMR) for rapid development and includes a robust ESLint configuration to help maintain code quality.

## Features
- **Voice to Text** and **Voice to Code** modes
- Real-time speech recognition and code generation
- Monaco code editor integration
- Easily extensible and customizable

## Technology Stack
- [React](https://react.dev/) for building user interfaces
- [Vite](https://vitejs.dev/) for fast development and build tooling
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) for seamless React integration with Babel-based Fast Refresh
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for in-browser code editing

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Preview the production build:**
   ```sh
   npm run preview
   ```

## Linting
To maintain code quality, run ESLint:
```sh
npm run lint
```

## TypeScript Support
For production-grade applications, we recommend using TypeScript with type-aware lint rules. See the [official React + TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for guidance on integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io).

---

For more information, refer to the documentation for [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Monaco Editor](https://microsoft.github.io/monaco-editor/).

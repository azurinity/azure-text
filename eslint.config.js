import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // 1. Ignore build artifacts across all workspaces
  {
    ignores: ["**/dist/**", "**/node_modules/**", "apps/sidecar/**"],
  },

  // 2. Load underlying base configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Define language option parameters across TypeScript components
  {
    files: ["**/*.ts", "**/*.mts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true, // Auto-discovers local workspace tsconfig mappings
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Apply structural rules fitting strict architectural designs
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
);

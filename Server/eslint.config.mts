// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "build/**"], // ✅ Ignore dist, node_modules, and build folder output
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    rules: {
      "no-console": "error",
      "no-unused-vars": "error",
      "no-useless-escape": "error",
      "no-useless-computed-key": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-void": "error",
      "no-warning-comments": "error",
      "no-with": "error",
      quotes: ["error", "double"]
    }
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic
);

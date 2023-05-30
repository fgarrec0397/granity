module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      "plugin:react/recommended",
      "airbnb-typescript",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:import/recommended",
      "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react", "react-hooks", "@typescript-eslint", "simple-import-sort"],
    rules: {
      "no-use-before-define": "off",
      "no-multi-assign": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-shadow": "off",
      "no-param-reassign": "off",
      "no-plusplus": "off",
      "no-useless-return": "off",
      "consistent-return": "off",
      "no-restricted-syntax": "off",
      "sort-imports": ["off", {
        "ignoreCase": false,
        "ignoreDeclarationSort": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
        "allowSeparatedGroups": false
      }],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "react/no-unknown-property": "off", // If on, this brings multiple invalid error... Should investigate in the future. If never it's not the case in your project for whatever reason, set it to "error"
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-unescaped-entities": "off",
      "react/destructuring-assignment": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "import/prefer-default-export": "off",
      "import/no-named-as-default": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never"
        }
      ]
    }
  }
  
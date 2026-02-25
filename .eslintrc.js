module.exports = {
    root: true,
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "react/react-in-jsx-scope": "off",
        "no-console": "off",
    },
};

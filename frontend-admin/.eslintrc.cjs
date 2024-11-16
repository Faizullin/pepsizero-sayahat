module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        es2021: true,
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off"
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};

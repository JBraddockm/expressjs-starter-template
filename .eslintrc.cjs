module.exports = {
    root: true,
    plugins: ['@typescript-eslint', 'import', 'prettier', 'simple-import-sort', 'no-relative-import-paths'],
    extends: [
        'airbnb-typescript/base',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    rules: {
        "no-relative-import-paths/no-relative-import-paths": [
            "warn",
            { "allowSameFolder": false, "rootDir": "src", "prefix": "@src" }
        ],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
    "overrides": [
        {
            "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
            "rules": {
                'linebreak-style': ['error', 'unix'],
                // override "simple-import-sort" config
                "simple-import-sort/imports": [
                    "error",
                    {
                        "groups": [
                            // Packages `react` related packages come first.
                            ["^react", "^@?\\w"],
                            // Internal packages.
                            ["^(@|components)(/.*|$)"],
                            // Side effect imports.
                            ["^\\u0000"],
                            // Parent imports. Put `..` last.
                            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            // Style imports.
                            ["^.+\\.?(css)$"]
                        ]
                    }
                ]
            }
        }
    ],
};
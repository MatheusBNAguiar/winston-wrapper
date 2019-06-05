module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    "globals": {
        "Atomics": "readonly",
        "process": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "parser": '@typescript-eslint/parser',
    "plugins": ['@typescript-eslint'],
    "rules": {
        '@typescript-eslint/restrict-plus-operands': 'error',
        "@typescript-eslint/indent": ["error", 2],
        "prettier/prettier": "false",
        "@typescript-eslint/no-var-requires": "false"
    }
};

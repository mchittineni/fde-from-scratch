import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', '_site/', 'test-results/', 'playwright-report/', 'coverage/'] },
  js.configs.recommended,
  {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'multi-line'],
      'no-implicit-globals': 'error',
      'no-shadow': ['error', { builtinGlobals: false }],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: false }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  },
  {
    // The site runs in the browser.
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser }
  },
  {
    // Tooling, the dev server and tests run in Node and may log.
    files: ['scripts/**', 'server.js', 'tests/**', '*.config.js'],
    languageOptions: { globals: globals.node },
    rules: { 'no-console': 'off' }
  },
  {
    // Playwright callbacks passed to page.evaluate() run in the browser.
    files: ['tests/e2e/**'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } }
  }
];

import globals from 'globals';
import { eslint, disableDuplicatedRules } from '@ljtang2009/lint-configuration';
import _ from 'lodash';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const baseConfig = _.merge(
  _.cloneDeep(eslint.buildIn.default),
  eslint.stylisticPlus.default,
  eslint.stylisticJs.default,
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
);

const baseTSConfig = _.merge(
  _.cloneDeep(baseConfig),
  eslint.stylisticTs.default,
  eslint.ts.default,
);

let config = [
  {
    name: 'js',
    ..._.merge(_.cloneDeep(baseConfig), {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      ignores: [
        'dist/**/*',
        'coverage/**/*',
      ],
    }),
  },
  {
    name: 'ts/src',
    ..._.merge(_.cloneDeep(baseTSConfig), {
      files: ['src/**/*.ts'],
      ignores: ['src/**/*.spec.ts'],
      languageOptions: {
        parserOptions: {
          project: join(__dirname, 'tsconfig.json'),
          tsconfigRootDir: __dirname,
        },
      },
    }),
  },
  {
    name: 'ts/test',
    ..._.merge(_.cloneDeep(baseTSConfig), {
      files: ['test/**/*.spec.ts', 'test/**/*.test.ts'],
      languageOptions: {
        parserOptions: {
          project: join(__dirname, 'tsconfig.json'),
          tsconfigRootDir: __dirname,
        },
      },
    }, eslint.jest.default),
  },
  {
    name: 'ts/root',
    ..._.merge(_.cloneDeep(baseTSConfig), {
      files: [
        '*.ts',
      ],
      languageOptions: {
        parserOptions: {
          project: join(__dirname, 'tsconfig.node.json'),
          tsconfigRootDir: __dirname,
        },
      },
    }),
  },
  {
    name: 'json',
    ..._.merge(_.cloneDeep(eslint.json.default), {
      files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
      ignores: [
        'coverage/**/*',
        'package.json',
        '.vscode/**/*',
      ],
    }),
  },
];

// 禁用重复规则
config = disableDuplicatedRules(config);

export default config;

import { defineConfig, mergeConfig, coverageConfigDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: [
        'test/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      ],
      reporters: process.env.GITHUB_ACTIONS != null ? ['verbose', 'github-actions'] : ['verbose'],
      coverage: {
        enabled: true,
        include: [
          'src/**/*.?(c|m)[jt]s?(x)',
        ],
        exclude: [
          ...coverageConfigDefaults.exclude,
        ],
        reporter: [
          'text',
          'html',
          'json',
        ],
      },
    },
  }),
);

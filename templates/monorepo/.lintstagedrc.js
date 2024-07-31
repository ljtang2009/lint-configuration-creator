export default {
  '**/*.{js,cjs,mjs,jsx,ts,tsx,json,jsonc,json5}': ['eslint --fix'],
  '**/*.md': ['markdownlint-cli2 --fix'],
  '**/*': 'cspell lint --show-context  --show-suggestions',
};

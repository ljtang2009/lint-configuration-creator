export default {
  '**/*.{js,cjs,mjs,jsx,ts,tsx,json,jsonc,json5}': ['eslint --fix'],
  '**/*.md': ['markdownlint-cli2 --fix'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.{css,less,scss}': 'stylelint --fix',
  '**/*': 'cspell lint --show-context  --show-suggestions',
};

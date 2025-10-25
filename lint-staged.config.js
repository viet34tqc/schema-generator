const config = {
  // We have separate eslint and prettier configs for stated files only
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
}
export default config

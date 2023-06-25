/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './__tests__',
  testRegex: '.e2e.test.ts$', //<-- чтобы запускались только файлы с расширением ".e2e.test.ts"
};
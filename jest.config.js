const path = require('path')

module.exports = {
  transform: {
    '^.+\\.jsx?$': path.relative(
      process.cwd(),
      path.resolve(__dirname, './config/babel-jest'),
    ),
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/cjs/', '<rootDir>/es/'],
  testEnvironment: 'node',
}

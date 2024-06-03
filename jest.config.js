module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/mocks/fileMock.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.m?jsx?$': 'babel-jest',
    '\\.css$': '<rootDir>/src/tests/mocks/cssTransform.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  transformIgnorePatterns: [
    '/node_modules/(?!(swiper))',
  ],
};

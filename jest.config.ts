import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  collectCoverageFrom: [
    'routes/**/*.js', 
    'server.js',
    '!routes/auth.js', 
    '!routes/index.js', 
    '!routes/swagger.js',
  ],

  setupFiles: ['dotenv/config'],
};

export default config;
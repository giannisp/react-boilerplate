/**
 * @file Jest configuration file.
 */

module.exports = {
  rootDir: 'src',
  setupFilesAfterEnv: ['<rootDir>/utils/test-setup.js'],
  clearMocks: true,
};

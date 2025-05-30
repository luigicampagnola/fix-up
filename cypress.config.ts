import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust if your form is at a different URL
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: false,
  },
});
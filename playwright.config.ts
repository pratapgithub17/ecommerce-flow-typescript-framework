import { defineConfig, devices } from '@playwright/test';


import dotenv from 'dotenv';

const envName = process.env.TEST_ENV || 'qa'; 
dotenv.config({path: `env/.env.${envName}`}); 


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  reporter: [['html'],
              ['blob'],
              ['json', { outputFile: 'results.json' }],
              ['list'],            
],

 // Global Test Timeout
  timeout: 60_000,
 // Assertion Timeout
  expect: {
       timeout: 15_000,
     },

  use: {
        
        baseURL: process.env.BASE_URL,
        headless: false,    
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        navigationTimeout: 30_000,
        actionTimeout: 15_000,
      
      },




  /* Configure projects for major browsers */
  projects: [

        { name: 'setup', testMatch: /.*\.setup\.ts/ },   ////auth file setup
     {
      name: 'Chromium',
     dependencies: ['setup'],         //auth setup

      use: { 
              browserName:'chromium',   
              ...devices['Desktop Chrome'],
              viewport: { width: 1920, height:1080  },     // browser level setting
               
              storageState: 'playwright/.auth/UserSession.json', // auth authenticated session

             }

            
    },
      

  ],

 
  
});

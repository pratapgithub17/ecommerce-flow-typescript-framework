import {test,expect} from '@playwright/test';
import { CustomerJourneyFLow } from '../flows/customer-journey.flow'; 
import {ROUTES} from '../constants/routes.constants'
import { DataHelper } from '../utils/data.helper';
import data from '../test-data/testdata.json'
import  logger  from '../utils/logger.utils';


test.describe('Ecommerse Test Suite' ,()=> {

let customerJourneyFLow: CustomerJourneyFLow;


test.beforeAll(async()=> {

logger.info('Test Suite Execution Started')

})

test.beforeEach(async({page})=>{

  logger.info('Navigating to application')

   customerJourneyFLow = new CustomerJourneyFLow(page); 
   await page.goto(`${process.env.BASE_URL}${ROUTES.HOME}`);

   logger.info('Application launched successfully');

})


test('ecommerse flow', async() =>
{
    
  await customerJourneyFLow.verifyProductListPage(DataHelper.getMinPrice(), DataHelper.getMaxPrice(),DataHelper.getProductName());

  logger.info('Product Page Verification Completed')

  await customerJourneyFLow.verifyProductDetailsPage();
    
  logger.info('Product Details Page Verification Completed')

  await customerJourneyFLow.verifyCartPage(DataHelper.getProductName());

  logger.info('Cart Page Verification Completed')

  await customerJourneyFLow.verifyCheckoutPage(DataHelper.getFirstName(),DataHelper.getLastName(),DataHelper.getAddress1(),
                                              DataHelper.getAddress2(),DataHelper.getCity(),DataHelper.getPostCode(),
                                              DataHelper.getCountry(),DataHelper.getState())

  logger.info('Checkout Page Verification Completed')

  await customerJourneyFLow.verifiyConfirmOrderPage(DataHelper.getProductName());

  logger.info('Confirm Order Page Verification Completed')

  await customerJourneyFLow.verifyOrderSuccessMessage();

  logger.info('Order Success Message Verified')


})

test.afterEach(async ({ page }, testInfo) => {

      if (testInfo.status !== testInfo.expectedStatus) {

         logger.error(`Test Failed: ${testInfo.title}`);

         await page.screenshot({path:`screenshots/${testInfo.title}.png`, fullPage: true});
       }

       logger.info('Test execution completed');
   });

test.afterAll(async()=> {

  logger.info('Test Suite Execution completed');

  
})


});

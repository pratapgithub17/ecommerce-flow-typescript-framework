import {test as setup} from '@playwright/test';
import { LoginPage } from '../pages/login.page'
import {ROUTES} from '../constants/routes.constants'
import path from 'path';


const authFile = path.join(__dirname, '../playwright/.auth/UserSession.json');


setup('Aunthentication', async ({browser}) =>{

      const context = await browser.newContext();
      const page = await context.newPage();

     // Login

      const login = new LoginPage(page);
      await page.goto(`${process.env.BASE_URL}${ROUTES.LOGIN}`);
      await login.authLogin(process.env.EMAIL_ID!,process.env.PASSWORD!);

      await context.storageState({path:authFile});

      await context.close();

})
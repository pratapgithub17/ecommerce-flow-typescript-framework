import{expect,Page, Locator} from '@playwright/test';

export class LoginPage {

private readonly page:Page;
private readonly homePageHeadlineLocator:Locator;
private readonly myAccountLocator:Locator;
private readonly linkLoginLocator:Locator;
private readonly myAccountManuLocator:Locator;
private readonly loginTextLocator:Locator;
private readonly emailLocator:Locator;
private readonly passwordLocator:Locator;
private readonly loginBtnLocator:Locator;
private readonly myAccountTextLocator:Locator;


    constructor(page:Page){

        this.page = page;
        this.homePageHeadlineLocator= page.getByRole('heading',{name:'Top Trending Categories'});
        this.myAccountLocator = page.getByRole('button',{name:' My account'});
        this.linkLoginLocator = page.getByRole('link',{name:' Login'});
        this.myAccountManuLocator= page.getByText('Login Register', { exact: true });
        this.loginTextLocator = page.getByRole('heading',{name:'Returning Customer'});
        this.emailLocator = page.locator('#input-email');
        this.passwordLocator= page.locator('#input-password');
        this.loginBtnLocator=page.getByRole('button',{name:'Login'});
        this.myAccountTextLocator= page.getByRole('heading',{name:'My Account'});

    }


 async launchUrl(login:any) {

          await this.page.goto(login);

 }

 async waitUntilHomePageLoad (){

          await expect(this.homePageHeadlineLocator).toBeVisible();
      
 }


async redirectToLoginPage(){

          await this.myAccountLocator.hover();
          await expect(this.myAccountManuLocator).toBeVisible();
          await this.linkLoginLocator.click();

}

async VerifyLoginPageRedirection(){

         await expect(this.loginTextLocator).toBeVisible();

            

}

async loginWithEmailPassword(email:string, password:string){

        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);   
        await this.loginBtnLocator.click();      
        await expect(this.myAccountTextLocator).toBeVisible();


}

async authLogin(email:string, password:string){

        await expect(this.loginTextLocator).toBeVisible();
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);   
        await this.loginBtnLocator.click();      
       

}

} 


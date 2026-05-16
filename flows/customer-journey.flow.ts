import {test,Page,expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page'; 
import {ProductListPage} from '../pages/productlist.page';
import {ProductDetailsPage} from '../pages/productdetails.page';
import {CartPage} from '../pages/cart.page';
import {CheckoutPage} from '../pages/checkout.page';
import {ConfirmOrderPage}from '../pages/confirmorder.page';

export class CustomerJourneyFLow{

   private readonly page:Page; 
   private readonly loginPage:LoginPage;
   private readonly productListPage:ProductListPage;
   private readonly productDetailsPage:ProductDetailsPage;
   private readonly carPage: CartPage;
   private readonly checkoutPage:CheckoutPage;
   private readonly confirmOrderPage:ConfirmOrderPage;

constructor(page:Page) {

          this.page = page;
          this.loginPage =new LoginPage(page)
          this.productListPage =new ProductListPage(page)
          this.productDetailsPage =new ProductDetailsPage(page)
          this.carPage =new CartPage(page)
          this.checkoutPage =new CheckoutPage(page)
          this.confirmOrderPage =new ConfirmOrderPage(page)

       }

  async loginInApplication(login:any,email:string, password:string){

        await this.loginPage.launchUrl(login);
        await this.loginPage.waitUntilHomePageLoad();
        await this.loginPage.redirectToLoginPage();
        await this.loginPage.VerifyLoginPageRedirection()
        await this.loginPage.loginWithEmailPassword(email,password);

  }     

  async verifyProductListPage(minPrice:string, maxPrice:string,productName:string){

        await this.productListPage.redirectToProductListPage();
        await this.productListPage.filterProduct(minPrice, maxPrice);
        await this.productListPage.waituntilProductLoad();
        await this.productListPage.selectProduct(productName);

  }

  async  verifyProductDetailsPage(){

        await this.productDetailsPage.VerifyRedirectionToDetailsPage();
        await this.productDetailsPage.VerifyAvailabilityOfProduct();
        await this.productDetailsPage.redirectToAddCartPage();

  }

  async verifyCartPage(productName:string){

        await this.carPage.verifyRedirectionInCartPage();
        await this.carPage.verifyProductNameInCart(productName);
        await this.carPage.checkoutProductInCart()


  }

 async verifyCheckoutPage(firstName:string,lastName:string,address1:string,address2:string,city:string,postCode:string,
                         country:string,state:string){

       await this.checkoutPage.verifycheckoutPageRedirection();
       await this.checkoutPage.selectAddressRadioButton();
       await this.checkoutPage.fillBillingAddress(firstName,lastName,address1,address2,city,postCode,country,state);
       await this.checkoutPage.checkTermAndCondition();
       await this.checkoutPage.clickToContinue();

 } 

async verifiyConfirmOrderPage(productName:string){

       await this.confirmOrderPage.verifyRedirectionInConfirmOrder();
       await this.confirmOrderPage.confirmProductName(productName);
       await this.confirmOrderPage.clickOnConfirmOrderBtn();

}


async verifyOrderSuccessMessage(){

      await this.confirmOrderPage.verifySuccessOrderStatus();


}
}
import{expect,Page, Locator} from '@playwright/test';

export class CartPage{


       private readonly page:Page;
       private readonly cartTitleText: Locator;
       private readonly checkoutButton : Locator;
       private readonly billingAddressLocator: Locator;


        constructor(page:Page){
               
            this.page=page;
            this.cartTitleText= page.getByText('Shopping Cart',{exact:true});
            this.checkoutButton= page.getByRole('link',{name:'Checkout'});
            this.billingAddressLocator= page.getByRole('heading',{name:'Billing Address',exact:true});



        }


  async verifyRedirectionInCartPage(){

           await expect(this.cartTitleText).toBeVisible();


  }      

  async verifyProductNameInCart(productName:string){

          await expect(this.page.locator('tbody tr').locator('.text-left').getByRole('link',{name:productName, exact:true})).toHaveText(productName);


  }

  async checkoutProductInCart(){

         await expect(this.checkoutButton).toBeEnabled();
         await this.checkoutButton.click();


        
  }

}


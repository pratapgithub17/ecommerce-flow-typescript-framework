import{expect,Page, Locator} from '@playwright/test';

export class ConfirmOrderPage{

private readonly page:Page;
private readonly confirmOrderTextLocator:Locator;
private readonly confirmOrderButtonLocator:Locator;
private readonly orderStatusMessege:Locator;


constructor(page:Page){


                this.page=page;
                this.confirmOrderTextLocator=page.getByRole('heading', { name: 'Confirm Order',exact:true });
                this.confirmOrderButtonLocator= page.getByRole('button',{name:'Confirm Order '});
                this.orderStatusMessege= page.getByRole('heading',{name:' Your order has been placed!'});

     }


   async verifyRedirectionInConfirmOrder(){

           await expect(this.confirmOrderTextLocator).toBeVisible();


   }  

   async confirmProductName(productName:string){

            await expect(this.page.locator('tbody tr').getByRole('cell',{name:productName,exact: true}).last()).toBeVisible();
            
  }

  async clickOnConfirmOrderBtn(){

           await  expect(this.confirmOrderButtonLocator).toBeVisible();
           await this.confirmOrderButtonLocator.click();
            
       

  }

  async verifySuccessOrderStatus(){

          await  expect(this.orderStatusMessege).toBeVisible();

  }

}


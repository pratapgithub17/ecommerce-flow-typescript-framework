import{expect,Page, Locator} from '@playwright/test';

 export class ProductDetailsPage{

private readonly page:Page;
private readonly addToCartButton:Locator;
private readonly inStockText:Locator;
private readonly outOfStockButton:Locator;
private readonly viewCartButton:Locator;
private readonly loadBlockLocator:Locator;
private readonly cartTitleText:Locator;



      constructor(page:Page){

              this.page=page;
              this.addToCartButton= page.locator('#entry_216842').getByRole('button',{name:'Add to Cart'});
              this.inStockText= page.getByText('In Stock');
              this.outOfStockButton= page.locator('#entry_216842').getByRole('button',{name:'Out Of Stock',exact:true});
              this.viewCartButton= page.getByRole('link', {name:'View Cart '});
              this.loadBlockLocator= page.locator('#entry_216840');
              this.cartTitleText= page.getByText('Shopping Cart',{exact:true});



      }

  async VerifyRedirectionToDetailsPage(){

          await expect(this.loadBlockLocator).toBeVisible();
          const productInStock = await this.addToCartButton.isVisible();
          const productOutOfStock= await this.outOfStockButton.isVisible();

          if ((productInStock || productOutOfStock)===true) {
              
                return;
           }
        }      

  async VerifyAvailabilityOfProduct(){

       const stockStatus= await this.inStockText.isVisible();
          console.log(stockStatus);


           if (!stockStatus)
           {
                throw new Error('Product is Out of Stock');
           }
           
            await expect(this.inStockText).toBeVisible();


  }

  async redirectToAddCartPage(){

                  await this.addToCartButton.click();
                  await this.viewCartButton.waitFor({timeout:30000});
                  await expect(this.viewCartButton).toBeVisible();
                  await this.viewCartButton.click();

                 


  }


}


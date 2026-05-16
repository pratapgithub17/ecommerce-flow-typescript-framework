import{expect,Page, Locator} from '@playwright/test';

 export class ProductListPage {

 private readonly page:Page;
 private readonly megaMenulinkLocator:Locator;
 private readonly megaMenuLayout:Locator;
 private readonly productClassLocator:Locator;
 private readonly filterSectionTextLocator:Locator;
 private readonly minPriceLocator:Locator;
 private readonly maxPriceLocator:Locator;
 private readonly productLayoutLocator:Locator;
 private readonly colourfilterlocator:Locator;
 private readonly inStockfilterLocator:Locator;
 private readonly loadBlockLocator:Locator;


    constructor(page:Page){

             this.page= page;
             this. megaMenulinkLocator= page.getByRole('button',{name:' Mega Menu'});
             this.megaMenuLayout=  page.locator('#entry281_216475');
             this.productClassLocator= page.getByRole('link',{name:'Headphones', exact:true})
             this.filterSectionTextLocator= page.locator("h3:has-text('Filter')");
             this.minPriceLocator= page.locator('#mz-filter-panel-0-0').getByPlaceholder('Minimum Price');
             this.maxPriceLocator= page.locator('#mz-filter-panel-0-0').getByPlaceholder('Maximum Price');
             this.productLayoutLocator= page.locator('.product-layout');
             this.colourfilterlocator= page.locator("#mz-filter-panel-0-4").getByRole('img',{name:'Orange'});  
             this.inStockfilterLocator = page.locator('#mz-filter-panel-0-5').getByText('In stock', {exact:true});
             this.loadBlockLocator= page.locator('#entry_216840');
    }

   async redirectToProductListPage (){

            await expect(this.megaMenulinkLocator).toBeVisible();
            await this.megaMenulinkLocator.hover();
            await this.productClassLocator.waitFor({state: 'visible'});
            await expect(this.productClassLocator).toBeVisible();
            await   this.productClassLocator.click();         
            await expect(this.filterSectionTextLocator).toBeVisible();

   }

   async filterProduct(minPrice:string, maxPrice:string){
                         
           await this.minPriceLocator.fill(minPrice);
           await this.maxPriceLocator.fill(maxPrice);
           await this.maxPriceLocator.press('Enter');
           await this.page.waitForLoadState('networkidle');
           await this.colourfilterlocator.click();
           await this.page.waitForLoadState('networkidle');
           await this.inStockfilterLocator.click();
           await this.page.waitForLoadState('networkidle');


   }

     async waituntilProductLoad(){

        await expect(this.productLayoutLocator.first()).toBeAttached();
        await expect(this.productLayoutLocator.first()).toBeVisible();
  }

   async selectProduct(productName:string){

               await this.page.locator('.caption',{hasText:productName}).getByRole('link',{name:productName, exact:true}).click();

  }


}


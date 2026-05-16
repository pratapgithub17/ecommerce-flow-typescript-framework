import{expect,Page, Locator} from '@playwright/test';

export class CheckoutPage{

        private readonly page:Page;
        private readonly billingAddressLocator:Locator;
        private readonly addressRadioButton:Locator;
        private readonly firstName:Locator;
        private readonly lastName:Locator;
        private readonly address1:Locator;
        private readonly address2:Locator;
        private readonly city:Locator;
        private readonly postCode:Locator;
        private readonly country:Locator;
        private readonly state:Locator;
        private readonly checkTermAndConditionLocator:Locator;
        private readonly continueBtnLocator:Locator;
        private readonly confirmOrderText:Locator;

                

    constructor(page:Page){

               this.page=page;
               this.billingAddressLocator= page.getByRole('heading',{name:'Billing Address',exact:true});
               this.addressRadioButton= page.locator('#payment-address').getByText('I want to use a new address');
               this.firstName= page.locator('#input-payment-firstname');
               this.lastName= page.locator('#input-payment-lastname');
               this.address1= page.locator('#input-payment-address-1');
               this.address2= page.locator('#input-payment-address-2');
               this.city= page.locator('#input-payment-city');
               this.postCode= page.locator('#input-payment-postcode');
               this.country= page.locator('#input-payment-country');
               this.state= page.locator('#input-payment-zone');
               this.checkTermAndConditionLocator= page.getByText('I have read and agree to the ').last();
               this.continueBtnLocator= page.locator("//button[@id='button-save']");
               this.confirmOrderText=page.getByRole('heading', { name: 'Confirm Order',exact:true });



        
    }


  async verifycheckoutPageRedirection(){

          await expect(this.billingAddressLocator).toBeVisible();

  }

 async selectAddressRadioButton(){

          await this.addressRadioButton.click();

 }

 async fillBillingAddress(firstName:string,lastName:string,address1:string,address2:string,city:string,postCode:string,country:string,state:string){
              
          await expect(this.firstName).toBeVisible();
          await this.firstName.fill(firstName);
          await this.lastName.fill(lastName);
          await this.address1.fill(address1);
          await this.address2.fill(address2);
          await this.city.fill(city);
          await this.postCode.fill(postCode);
          await this.country.selectOption({label:country});
          await this.state.selectOption({label:state});          

 }

 async checkTermAndCondition(){

         await expect(this.checkTermAndConditionLocator).toBeEnabled();
         await this.checkTermAndConditionLocator.click();
         await this.checkTermAndConditionLocator.waitFor({timeout:30000});


 }  

async clickToContinue(){

          await expect(this.continueBtnLocator).toBeEnabled();
          await this.continueBtnLocator.click();
}

}

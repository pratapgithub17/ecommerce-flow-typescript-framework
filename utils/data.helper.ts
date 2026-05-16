import {testData} from '../test-data/checkoutData'


export class DataHelper{


   static getProductName(): string {
        return testData.productName;

  }

   static getFirstName (): string {
         return testData.checkoutInfo.firstName ;

  }

    static getLastName (): string {
        return testData.checkoutInfo.lastName ;

  }

    static getAddress1 (): string {
        return testData.checkoutInfo.address1 ;

  }

    static getAddress2 (): string {
        return testData.checkoutInfo.address2 ;

  }

     static getCity (): string {
        return testData.checkoutInfo.city ;
  
  }

     static getPostCode (): string {
        return testData.checkoutInfo.postCode ;
  
  }

     static getCountry (): string {
        return testData.checkoutInfo.country ;
  
  }

     static getState (): string {
        return testData.checkoutInfo.state;
  
  }

      static getMinPrice ():string {
        return testData.price.minPrice;
  
  }

      static getMaxPrice(): string {
        return testData.price.maxPrice;
  
  }


}
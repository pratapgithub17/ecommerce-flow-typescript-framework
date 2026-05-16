
export type TestDataType = {
    
  productName: string;
  checkoutInfo: {
            firstName: string;
            lastName: string;
            address1: string;
            address2: string;
            city: string;
            postCode: string;
            country: string;
            state: string;
  },

  price: {
    minPrice: string;
    maxPrice: string;
  }
}
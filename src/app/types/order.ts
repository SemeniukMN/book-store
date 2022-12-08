
export interface Order {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  region: string;
  city: string;
  address: string;
  deliveryDate: string;
  pay: string;
  products: {id: number, price: number}[];
}

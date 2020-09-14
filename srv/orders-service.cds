using { com.sap.shoppingcart as shoppingcart } from '../db/data-model';

service OrdersService {
  entity Orders as projection on shoppingcart.Orders;
  entity Products as projection on shoppingcart.Products;
}
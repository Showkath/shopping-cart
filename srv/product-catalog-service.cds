using { com.sap.shoppingcart as productsSrv } from '../db/data-model';
service CatalogService @(path:'/browse') {

  @readonly entity Products as SELECT from productsSrv.Products {*,
    manufacturer.name as brand
  } excluding { createdBy, modifiedBy };

  //Only authenticated user can submit Order
  @requires_: 'authenticated-user'
  action submitOrder (product : Products.ID, amount: Decimal);
}
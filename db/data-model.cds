namespace com.sap.shoppingcart;
using { Currency, managed, sap,cuid,Country } from '@sap/cds/common';
entity Products : managed 
{ 
  key ID : Integer;
  name   : String(100);
  description : String;
  stock  : Integer;
  price  : Decimal(9,2);
  currency : Currency;
  manufacturer : Association to Manufacturer;
}
entity Manufacturer 
{
  key ID : UUID;
  name   : String(111);
  country  : Country;//to be other entity also
  products  : Association to many Products on products.manufacturer = $self;
}
entity Orders : cuid, managed {
  orderNo  : String ;
  items    : Composition of many OrderItems on items.order = $self;
  currency : Currency;
  netAmount : Decimal(9,2);
}

entity OrderItems : cuid {
  order     : Association to Orders;    
  product   : Association to Products;    
  quantity  : Integer; 
  amount    : Decimal(9,2);
}
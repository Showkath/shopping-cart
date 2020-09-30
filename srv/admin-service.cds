/**
 * Only admin have access into this admin AdminService i.e only users with role admin can access this endpoint
 *
 * @author Showkath Naseem
 */
using { com.sap.shoppingcart as adminSrv } from '../db/data-model';
service AdminService @(requires_:'admin')  @(path:'/admin') {
  entity Products as projection on adminSrv.Products;
  entity Manufacturer as projection on adminSrv.Manufacturer;
}
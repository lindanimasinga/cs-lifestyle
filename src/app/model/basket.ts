/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { BasketItem } from './basketItem';


export interface Basket { 
    id?: string;
    storeName?: string;
    storeId?: string;
    items?: Array<BasketItem>;
}

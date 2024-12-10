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
import { Bank } from './bank';
import { BusinessHours } from './businessHours';
import { Stock } from './stock';


export class StoreProfile {
    brandSecondaryColor: string;
    brandPrimaryColor: string;
    shortName?: string; 
    address?: string;
    badges?: number;
    bank?: Bank;
    businessHours?: Array<BusinessHours>;
    date?: Date;
    description?: string;
    featured?: boolean;
    featuredExpiry?: Date;
    hasVat?: boolean;
    id?: string;
    imageUrl?: string;
    latitude?: number;
    likes?: number;
    longitude?: number;
    mobileNumber?: string;
    email?: String;
    modifiedDate?: Date;
    name?: string;
    ownerId?: string;
    regNumber?: string;
    responseTimeMinutes?: number;
    role?: StoreProfile.RoleEnum;
    servicesCompleted?: number;
    stockList?: Array<Stock>;
    storeType?: StoreProfile.StoreTypeEnum;
    tags?: Array<string>;
    verificationCode?: string;
    yearsInService?: number;
    storeOffline?: boolean;
    deliversFromMultipleAddresses?: boolean;
    storeMessenger?: Array<StoreMessanger>
}
export namespace StoreProfile {
    export type RoleEnum = 'CUSTOMER' | 'STORE_ADMIN' | 'STORE' | 'MESSENGER';
    export const RoleEnum = {
        CUSTOMER: 'CUSTOMER' as RoleEnum,
        STOREADMIN: 'STORE_ADMIN' as RoleEnum,
        STORE: 'STORE' as RoleEnum,
        MESSENGER: 'MESSENGER' as RoleEnum
    };
    export type StoreTypeEnum = 'FOOD' | 'CLOTHING' | 'SALON' | 'CAR_WASH';
    export const StoreTypeEnum = {
        FOOD: 'FOOD' as StoreTypeEnum,
        CLOTHING: 'CLOTHING' as StoreTypeEnum,
        SALON: 'SALON' as StoreTypeEnum,
        CARWASH: 'CAR_WASH' as StoreTypeEnum
    };
}

export class StoreMessanger {
    name?: string
}

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


export interface ShippingData { 
    additionalInstructions: string;
    buildingName?: string;
    buildingType?: ShippingData.BuildingTypeEnum;
    fee?: number;
    fromAddress: string;
    fromBuildingType?: ShippingData.BuildingTypeEnum
    fromUnitNumber?: String
    fromBuildingName?: String
    id?: string;
    messengerId?: string;
    pickUpTime?: Date;
    toAddress: string;
    type: ShippingData.TypeEnum;
    unitNumber?: string;
}

export namespace ShippingData {
    export type BuildingTypeEnum = 'HOUSE' | 'OFFICE' | 'APARTMENT';
    export const BuildingTypeEnum = {
        HOUSE: 'HOUSE' as BuildingTypeEnum,
        OFFICE: 'OFFICE' as BuildingTypeEnum,
        APARTMENT: 'APARTMENT' as BuildingTypeEnum
    };
    export type TypeEnum = 'COLLECTION' | 'DELIVERY';
    export const TypeEnum = {
        COLLECTION: 'COLLECTION' as TypeEnum,
        DELIVERY: 'DELIVERY' as TypeEnum
    };
}

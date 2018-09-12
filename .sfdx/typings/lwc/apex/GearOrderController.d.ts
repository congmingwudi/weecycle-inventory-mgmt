declare module "@salesforce/apex/GearOrderController.getPartnerOrgSelection" {
  export default function getPartnerOrgSelection(): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.getGearOrder" {
  export default function getGearOrder(param: {orderID: any, orderName: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.getGearOrderDemographicSelection" {
  export default function getGearOrderDemographicSelection(param: {orderID: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.getGearOrderItems" {
  export default function getGearOrderItems(param: {orderID: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.getProductSelection" {
  export default function getProductSelection(): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.createGearOrderItem" {
  export default function createGearOrderItem(param: {orderID: any, demographicID: any, productID: any, quantity: any, season: any, clothingSize: any, diaperSize: any, comment: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.updateGearOrderItem" {
  export default function updateGearOrderItem(param: {orderID: any, orderItemID: any, productID: any, quantity: any, season: any, clothingSize: any, diaperSize: any, comment: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.deleteGearOrderItem" {
  export default function deleteGearOrderItem(param: {orderID: any, orderItemID: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.getPicklistValues" {
  export default function getPicklistValues(param: {obj: any, field: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.updateOrderComment" {
  export default function updateOrderComment(param: {orderID: any, comment: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.getGearOrderForBulkDemographics" {
  export default function getGearOrderForBulkDemographics(param: {orderID: any, orderName: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderController.createGearOrderDemographics" {
  export default function createGearOrderDemographics(param: {orderID: any, totalNumFamiliesServed: any, demographicList: any}): Promise<any>;
}

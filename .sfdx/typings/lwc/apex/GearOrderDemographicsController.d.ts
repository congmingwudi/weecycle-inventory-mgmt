declare module "@salesforce/apex/GearOrderDemographicsController.getGearOrder" {
  export default function getGearOrder(param: {orderID: any, orderName: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.getGearOrderDemographics" {
  export default function getGearOrderDemographics(param: {orderID: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.getGearOrderSiblingDemographics" {
  export default function getGearOrderSiblingDemographics(param: {demographicID: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.getPicklistValues" {
  export default function getPicklistValues(param: {obj: any, field: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.createGearOrderDemographic" {
  export default function createGearOrderDemographic(param: {orderID: any, childAlias: any, childGender: any, childAge: any, childRaceEthnicity: any, parentGender: any, parentAge: any, parentRaceEthnicity: any, parentMaritalStatus: any, comment: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.updateGearOrderDemographic" {
  export default function updateGearOrderDemographic(param: {orderID: any, demographicID: any, childAlias: any, childGender: any, childAge: any, childRaceEthnicity: any, parentGender: any, parentAge: any, parentRaceEthnicity: any, parentMaritalStatus: any, comment: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.deleteGearOrderDemographic" {
  export default function deleteGearOrderDemographic(param: {orderID: any, demographicID: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.updateNumFamiliesServed" {
  export default function updateNumFamiliesServed(param: {orderID: any, numFamiliesServed: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.updateDemographics" {
  export default function updateDemographics(param: {orderID: any, demographicList: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.createGearOrderSiblingDemographic" {
  export default function createGearOrderSiblingDemographic(param: {demographicID: any, siblingGender: any, siblingAge: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.updateGearOrderSiblingDemographic" {
  export default function updateGearOrderSiblingDemographic(param: {siblingDemographicID: any, siblingGender: any, siblingAge: any}): Promise<any>;
}
declare module "@salesforce/apex/GearOrderDemographicsController.deleteGearOrderSiblingDemographic" {
  export default function deleteGearOrderSiblingDemographic(param: {siblingDemographicID: any}): Promise<any>;
}

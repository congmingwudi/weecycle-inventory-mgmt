public with sharing class ProductController {
    
    @AuraEnabled
    public static List<Product__c> getProducts() {
       System.debug('ProductController - getProducts');
       return [SELECT Id, Name, Family__c, Quantity__c FROM Product__c WHERE Available_To_Order__c=true];
    } 
    
}
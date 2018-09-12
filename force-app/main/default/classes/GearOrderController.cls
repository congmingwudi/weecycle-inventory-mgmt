public with sharing class GearOrderController {

    // ******** controller for lightning components: GearOrder_ItemEdit, GearOrder_EnterBulkDemographics

    // ******** OPERATIONS FOR lightning component: GearOrder_ItemEdit
    
    @AuraEnabled
    public static List<Account> getPartnerOrgSelection() {
       System.debug('GearOrderController > getPartnerOrgSelection');
       return [SELECT Id, Name FROM Account WHERE Type='Partner_Current'];
    } // end getPartnerOrgSelection
    
    @AuraEnabled
    public static List<Gear_Order__c> getGearOrder(String orderID, String orderName) {
       	System.debug('GearOrderController > getGearOrder - orderID: ' + orderID + ', orderName: ' + orderName);
       	if (orderID != null) {
       		return [SELECT Id, Name, Order_Status__c, Comment__c, Num_Children_Served__c, Line_Items__c FROM Gear_Order__c WHERE Id=:orderID];
        } else {
            return [SELECT Id, Name, Order_Status__c, Comment__c, Num_Children_Served__c, Line_Items__c FROM Gear_Order__c WHERE Name=:orderName];
        }
    } // end getGearOrder

    @AuraEnabled
    public static List<Gear_Order_Demographic__c> getGearOrderDemographicSelection(String orderID) {
       	System.debug('GearOrderController > getGearOrderDemographicSelection - orderID: ' + orderID);
        
        List<Gear_Order_Demographic__c> demographicsList =
            [SELECT Id, Name, Child_Alias__c, Child_Age__c, Child_Gender__c, Child_Race_Ethnicity__c FROM Gear_Order_Demographic__c WHERE Gear_Order__c = :orderID];        

        return demographicsList;
        
    } // end getGearOrderDemographicSelection
    
    @AuraEnabled
    public static List<Gear_Order_Item__c> getGearOrderItems(String orderID) {
       	System.debug('GearOrderController > getGearOrderItems - orderID: ' + orderID);
        
        List<Gear_Order_Item__c> orderItemList = null;
       	
        List<Gear_Order__c> orderList = getGearOrder(orderID, null);
        if (orderList.size() > 0) {
            Gear_Order__c order = orderList.get(0);          
            orderItemList = [SELECT Id, Name, Gear_Order_Demographic__c, Product__r.Id, Product__r.Name, Product__r.Family__c, Quantity__c, Season__c, Clothing_Size__c, Diaper_Size__c, Comment__c FROM Gear_Order_Item__c WHERE Gear_Order__c = :order.Id];        
        }
        
        if (orderItemList == null) {
            orderItemList = new List<Gear_Order_Item__c>();
        }
        
        return orderItemList;
        
    } // end getGearOrderItems    
    
    @AuraEnabled
    public static List<Product__c> getProductSelection() {
       System.debug('GearOrderController > getProductSelection');
       return [SELECT Id, Name, Family__c, Item_Bundle__c FROM Product__c WHERE Available_To_Order__c=true];
    } // end getProductSelection
    
    @AuraEnabled
    public static Gear_Order_Item__c createGearOrderItem(String orderID, String demographicID, 
                                                         String productID, Integer quantity, 
                                         				 String season, String clothingSize, String diaperSize,
                                                         String comment) {
        System.debug('GearOrderController > createGearOrderItem - orderID: ' + orderID  + ', demographicID:' + demographicID
        	+ ', productID: ' + productID + ', quantity: ' + quantity
        	+ ', season: ' + season + ', clothingSize: ' + clothingSize + ', diaperSize: ' + diaperSize
            + ', comment: ' + comment);
        
        // orderItem
        Gear_Order_Item__c orderItem = new Gear_Order_Item__c();
        orderItem.Gear_Order__c = orderID;
        orderItem.Gear_Order_Demographic__c = demographicID;
        orderItem.Product__c = productID;
        orderItem.Quantity__c = Integer.valueOf(quantity);
        orderItem.Season__c = season;
        orderItem.Clothing_Size__c = clothingSize;
        orderItem.Diaper_Size__c = diaperSize;
        orderItem.Comment__c = comment;                                                     
            
        insert orderItem;
        System.debug('GearOrderController > createGearOrderItem - item created: ' + orderItem);
		return orderItem;
        
    } // end createGearOrderItem
    
    @AuraEnabled 
    public static Gear_Order_Item__c updateGearOrderItem(String orderID, String orderItemID, 
                                                         String productID, Integer quantity, 
                                         				 String season, String clothingSize, String diaperSize,
                                                         String comment) {
        System.debug('GearOrderController > updateGearOrderItem - orderID: ' + orderID + ', orderItemID: ' + orderItemID
        	+ ', productID: ' + productID + ', quantity: ' + quantity
        	+ ', season: ' + season + ', clothingSize: ' + clothingSize + ', diaperSize: ' + diaperSize
            + ', comment: ' + comment);
        
        // orderItem
        Gear_Order_Item__c orderItem = new Gear_Order_Item__c();
        orderItem.Gear_Order__c = orderID;
        orderItem.Id = orderItemID;
            
        // update 
        orderItem.Product__c = productID;
        orderItem.Quantity__c = Integer.valueOf(quantity);
        orderItem.Season__c = season;
        orderItem.Clothing_Size__c = clothingSize;
        orderItem.Diaper_Size__c = diaperSize; 
        orderItem.Comment__c = comment;                                                     
            
        update orderItem;
        System.debug('GearOrderController > updateGearOrderItem - item updated: ' + orderItem);
        return orderItem;
        
    } // end updateGearOrderItem      
    
    @AuraEnabled
    public static Gear_Order_Item__c deleteGearOrderItem(String orderID, String orderItemID) {
        System.debug('GearOrderController > deleteGearOrderItem - orderID: ' + orderID + ', orderItemID: ' + orderItemID);
        
        Gear_Order_Item__c orderItem = new Gear_Order_Item__c();
        orderItem.Gear_Order__c = orderID;
        orderItem.Id = orderItemID;
        
        delete orderItem;
        System.debug('GearOrderController > deleteGearOrderItem - item deleted: ' + orderItem);
        return orderItem;
        
    } // end updateGearOrderItem   
    
    // Option - inner class 
    public class Option {
        @AuraEnabled
        String label {get;set;}
        @AuraEnabled
        String value {get;set;}
    }
    
    // getPicklistValues - returns a list of inner class Option
    @AuraEnabled
    public static List<Option> getPicklistValues(SObject obj, String field) {
        System.debug('GearOrderController > getPicklistValues - obj: ' + obj + ', field: ' + field);
        List<Option> options = new List<Option>();
        
        // Get the object type of the SObject.
        Schema.sObjectType objType = obj.getSObjectType();
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        Map< String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        List<Schema.PicklistEntry> pickListOptions = fieldMap.get(field).getDescribe().getPickListValues();
        
        // Add these values to the select option list
        for (Schema.PicklistEntry a: pickListOptions) {
            Option option = new Option();
            option.label = a.getLabel();
            option.value = a.getValue();
            options.add(option);
        }
        
        System.debug('GearOrderController > getPicklistValues - values: ' + options);
        //options.sort();
        return options;
    } // getPicklistValues
    
    @AuraEnabled 
    public static String updateOrderComment(String orderID, String comment) {
        System.debug('GearOrderDemographicsController > updateOrderComment - orderID: ' + orderID + ', comment: ' + comment);
        
        // order
        Gear_Order__c order = new Gear_Order__c();
        order.Id = orderID;
            
        // update 
        order.Comment__c =  comment;
            
        update order;
        System.debug('GearOrderDemographicsController > updateOrderComment - order updated: ' + order);
        return 'ORDER_UPDATED';
        
    } // end updateOrderComment    
    
    
    // ******** OPERATIONS FOR lightning component: GearOrder_EnterBulkDemographics 

    @AuraEnabled
    public static List<Gear_Order__c> getGearOrderForBulkDemographics(String orderID, String orderName) {
       	System.debug('GearOrderController > getGearOrderForBulkDemographics - orderID: ' + orderID + ', orderName: ' + orderName);
       	if (orderID != null) {
       		return [SELECT Id, Name, Order_Status__c, Num_Families_Served__c, Num_Children_Served__c FROM Gear_Order__c WHERE Id=:orderID];
        } else {
            return [SELECT Id, Name, Order_Status__c, Num_Families_Served__c, Num_Children_Served__c FROM Gear_Order__c WHERE Name=:orderName];
        }
    } // end getGearOrder    
    
    @AuraEnabled
    public static List<String> createGearOrderDemographics(String orderID, Integer totalNumFamiliesServed, String demographicList) {
       	System.debug('GearOrderController > createGearOrderDemographics - orderID: ' + orderID + ', totalNumFamiliesServed: ' + Double.valueOf(totalNumFamiliesServed) + ', demographicList: ' + demographicList);
       	
        // update Gear Order num families served and bulk demographics flag
        Gear_Order__c order = new Gear_Order__c(Id=orderID);
       	order.Num_Families_Served__c = Double.valueOf(totalNumFamiliesServed);
        order.Bulk_Demographics__c = true;
        update order;
        
        // deserialize demographicList json
        List<Object> oList = (List<Object>)JSON.deserializeUntyped(demographicList);
        List<Gear_Order_Demographic__c> orderDemographicList = new List<Gear_Order_Demographic__c>();
        
        System.debug('GearOrderController > createGearOrderDemographics - demographicList: ' + oList + ', list size: ' + oList.size());
        
        for (Integer i = 0; i < oList.size(); ++i) {
            
            Object o = oList.get(i);
            //System.debug('GearOrderController > createGearOrderDemographics - demographic: ' + o);
            
            Map<String, Object> m = (Map<String, Object>) o;
            
            String raceEthnicity = (String) m.get('RaceEthnicity');
        	Integer percentFamiliesServed = Integer.valueOf(m.get('PercentFamiliesServed'));
        	Integer numFamiliesServed = Integer.valueOf(m.get('NumFamiliesServed'));
            
            if (percentFamiliesServed > 0) {
            	// create a set of Gear_Order_Demographic records for the number of families served (NumFamiliesServed) for each RaceEthnicity
            	System.debug('GearOrderController > createGearOrderDemographics - for RaceEthnicity: ' + raceEthnicity + ', creating this number of Gear_Order_Demographic: ' + numFamiliesServed);                        
        	
				for (Integer j = 0; j < numFamiliesServed; ++j) {
                
                    // gear order demographic
                    Gear_Order_Demographic__c orderDemographic = new Gear_Order_Demographic__c();
                    orderDemographic.Gear_Order__c = orderID;
                    orderDemographic.Child_Race_Ethnicity__c = raceEthnicity;
                    orderDemographicList.add(orderDemographic);
                    
                } // end for numFamiliesServed
                
            } // end if percentFamiliesServed > 0
            
        } // for oList
        
        //System.debug('GearOrderController > createGearOrderDemographics - orderDemographicList: ' + orderDemographicList);
        insert orderDemographicList;
        
        List<String> responseList = new List<String>();
        responseList.add('success');
        return responseList;
    } // end getGearOrder
      
    
} // GearOrderController
global without sharing class GearOrder_CreateContact {

    // called from the New Gear Order flow.
    // the flow action 'Create Record' does the same thing as this method
    // but using this apex method makes the flow cleaner, because the contact ID does not require a separate flow variable
    // instead, the flow only references the sObject contact.Id that is returned from this invocable method.
    // also, we may want to do other things here in the future, like create an Affiliation record to associate
    // this new contact with the partner organization for which the gear order is being created.
    
    @InvocableMethod(label='Create Contact')
    global static List<Contact> createContact(List<Contact> contacts) {
        
        System.debug('GearOrder_CreateContact - contacts to create: ' + contacts);
        
        // loop through contacts and double-check they don't exist first
        // this in an 'upsert' to prevent issues where contacts exist with the same name, but different email addresses
        // bad practice to do individual select then insert in a loop, but the flow only passes one contact in at a time so not problem
        
        for(Contact con : contacts) {
        	System.debug('GearOrder_CreateContact - con: ' + con);
            
        	List<Contact> cList = [SELECT Id FROM Contact WHERE FirstName =:con.FirstName AND LastName =:con.LastName];
            System.debug('GearOrder_CreateContact - cList: ' + cList);
            
            if (cList.size() == 0) {
                // create contact
                insert con;
            } 
        }       
        
        //System.debug('GearOrder_CreateContact - contacts created: ' + contacts); 
        
        return contacts;
        
    } // end createContact   
    
} // end GearOrder_CreateContact
@isTest
private class GearOrder_CreateContactTest {

    @isTest static void test_createContact() {
        
        List<Contact> contacts = new List<Contact>();
        Contact con = new Contact(
            FirstName = 'Ryan', LastName = 'Cox', Email = 'ryan@test.com', MobilePhone = '720-982-5916'
        );
        contacts.add(con); 
            
        List<Contact> contactsCreated = GearOrder_CreateContact.createContact(contacts);
        System.debug('GearOrder_CreateContactTest > test_createContact - contactsCreated: ' + contactsCreated);
        
        
        
    } // end test_createContact
    
} // end GearOrder_CreateContactTest
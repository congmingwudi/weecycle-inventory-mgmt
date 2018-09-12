({
    
    getDeviceType: function(component) {
        
        var deviceType = $A.get("$Browser.formFactor");
        component.set("v.deviceType", deviceType);
        
    }, // end getDeviceType     
    
	getPartnerOrgSelection: function(component) {
        console.log('GearOrder_PartnerInfoEditHelper > getPartnerOrgSelection');        
        
        // Create the action
        var action = component.get("c.getPartnerOrgSelection"); // method on the GearOrderController
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrder_PartnerInfoEditHelper > getPartnerOrgSelection response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                
                // partnerOrgList                
                var partnerOrgList = response.getReturnValue();
                if (partnerOrgList == null) partnerOrgList = new Array();
                partnerOrgList.unshift({Name: "-- select your organization --", Id: null});
            	console.log('GearOrder_PartnerInfoEditHelper > getPartnerOrgSelection: ' + JSON.stringify(partnerOrgList)); 
                component.set("v.partnerOrgList", partnerOrgList);
                
            }
            else {
                console.log("GearOrder_PartnerInfoEditHelper > getPartnerOrgSelection - failed with state: " + state);
            }
        });

        // Send action off to be executed
		$A.enqueueAction(action);
        
    }, // end getPartnerOrgSelection  
    
	validateFields: function (component) {
        
        // checks all fields except the select field (because reportValidity and checkValidity are not supported on select fields)
        var mostlyValid = component.find('field').reduce(function (validSoFar, inputCmp) {
            inputCmp.reportValidity();            
            return validSoFar && inputCmp.checkValidity();
        }, true);
        
        // trim field values to prevent white spaces from causing issues when looking up existing contacts
        var firstName = component.get('v.contact.FirstName');
        //console.log("GearOrder_PartnerInfoEditHelper > validateFields - firstName: [" + firstName + "] length: " + firstName.length);
		firstName = firstName.trim();
        //console.log("GearOrder_PartnerInfoEditHelper > validateFields - firstName (after trim): [" + firstName + "] length: " + firstName.length);		component.set('v.contact.FirstName', firstName);
		component.set('v.contact.FirstName', firstName);
        
        var lastName = component.get('v.contact.LastName');
		lastName = lastName.trim();
		component.set('v.contact.LastName', lastName);

        var email = component.get('v.contact.Email');
		email = email.trim();
		component.set('v.contact.Email', email);
        
        // check partnerOrg select field
        var partnerOrgID = component.get('v.partnerOrgID');
        var selectValid = (partnerOrgID) ? true : false;
        
        return (mostlyValid && selectValid);
        
	}, // end validateFields    
    
})
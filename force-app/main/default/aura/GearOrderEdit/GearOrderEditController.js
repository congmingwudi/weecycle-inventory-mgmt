({
    init: function(component, event, helper) {
        console.log('GearOrderEditController > init');        

    	component.set('v.tableColumns', [
            {label: 'Order Item ID', fieldName: 'Name', type: 'text', sortable: true, iconName: "standard:lead_list"},
            {label: 'Product Category', fieldName: 'ProductCategory', type: 'text', sortable: true, iconName: "standard:record"},
            {label: 'Product', fieldName: 'ProductName', type: 'text', sortable: true, iconName: "standard:product_item"},
            {label: 'Quantity', fieldName: 'Quantity', type: 'number', sortable: true, iconName: "standard:metrics"},
            {type:  'button', typeAttributes: {iconName: 'utility:edit', label: '', name: 'edit', disabled: false}},
            {type:  'button', typeAttributes: {iconName: 'utility:delete', label: '', name: 'delete', disabled: false}},
            ]);                
        
        // load Gear Order (this pulls in order line items)
        var orderID = component.get("v.orderID");
        var orderName = component.get("v.orderName");
		helper.getGearOrder(component, orderID, orderName);
        
        // load product selection
        helper.getProductSelection(component);
        
        // load picklist values
        helper.loadPicklistValues(component);
        
    }, // end init
    
    // ORDER ITEM TABLE operations
    updateColumnSorting: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        helper.updateColumnSorting(component, fieldName, sortDirection);
    },
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        console.log('GearOrderEditController > row action: ' + JSON.stringify(action));

        switch (action.name) {
            case 'edit': {
            	console.log('GearOrderEditController > edit order item: ' + JSON.stringify(row));                
                helper.setOrderItemFields(component, row);
                
                // open modal
                component.set('v.orderItem_modalAction', 'update');
                component.set('v.orderItem_modalTitle', 'Edit Order Item');
            	component.set('v.orderItem_readonly', false);
    			component.set("v.isOpen", true);
                break;
            }
            case 'delete': {
            	console.log('GearOrderEditController > delete order item: ' + JSON.stringify(row));                
                helper.setOrderItemFields(component, row);               
                               
                // open modal
                component.set('v.orderItem_modalAction', 'delete');
                component.set('v.orderItem_modalTitle', 'Delete Order Item');
            	component.set('v.orderItem_readonly', true);
    			component.set("v.isOpen", true);
                break;
        	}
        } // end switch
    },
    
    // MODEL operations    
    openModel_AddOrderItem: function(component, event, helper) {
        // init order item
        var orderItem = {};
        orderItem.Quantity__c = 1;
        component.set("v.orderItem", orderItem);
        
        // product selection
        var productList = component.get('v.orderItem_productOptionList');
        var productIndex = 0; // just default to the first category in the list
        productList[productIndex].selected = true;
        component.set('v.orderItem.Product__c', productList[productIndex].Id);
        console.log('GearOrderEditController > openModel_AddOrderItem - product selection: ' + JSON.stringify(productList[productIndex]));        
        component.set('v.orderItem_productOptionList', productList);
        
        // open modal 
        component.set('v.orderItem_modalAction', 'create');
        component.set('v.orderItem_modalTitle', 'Add Order Item');
        component.set('v.orderItem_readonly', false);
    	component.set("v.isOpen", true);
   	}, 
    
    closeModel: function(component, event, helper) {
        component.set("v.isOpen", false);
    },    
    
    saveOrderItem: function(component, event, helper) {
        var modalAction = component.get('v.orderItem_modalAction');
        var order = component.get("v.order");
        var orderID = order.Id;
        var demographicID = null;
        console.log('GearOrderEditController > saveOrderItem (' + modalAction + ') - for orderID: ' + orderID);
        
        var doSave = false;
        
        var orderItem = component.get("v.orderItem");
        orderItem.Gear_Order__c = orderID;
        
        // product
		var productID = orderItem.Product__c;
        console.log('GearOrderEditController > saveOrderItem (' + modalAction + ') - product selected: ' + productID);
               
        // validate product selection        
        if (productID == 'category') {
            var errors = [{'message':'You selected a category. Please select a product.'}];
            component.set("v.orderItem_productErrors", errors);
		} else {            
            // clear error
    		component.set("v.orderItem_productErrors", null);
            doSave = true;
		}
        
        if (doSave) {
            // store order item
            console.log('GearOrderEditController > saveOrderItem (' + modalAction + ') - orderItem: ' + JSON.stringify(orderItem));
            if (modalAction == 'create') {
            	helper.createGearOrderItem(component, orderItem);
            } else if (modalAction == 'update') {
            	helper.updateGearOrderItem(component, orderItem);
            } 
            
            // close modal
           	component.set("v.isOpen", false);
        }
 
    }, // end saveOrderItem

    deleteOrderItem: function(component, event, helper) {
        var modalAction = component.get('v.orderItem_modalAction');
        var order = component.get("v.order");
        var orderID = order.Id;
        
        var orderItem = component.get("v.orderItem");
        orderItem.Gear_Order__c = orderID;
        console.log('GearOrderEditController > deleteOrderItem (' + modalAction + ') - for orderItem: ' + JSON.stringify(orderItem));
        
        helper.deleteGearOrderItem(component, orderItem);
        
		// close modal
        component.set("v.isOpen", false);
 
    }, // end saveOrderItem    
    
	productSelected: function(component, event, helper) {
        
		var productID = component.find("orderItem_product").get("v.value");
        console.log('GearOrderEditController > productSelected - productID: ' + productID);
		helper.productSelected(component, productID);
  
    }, // end productSelected   

    
})
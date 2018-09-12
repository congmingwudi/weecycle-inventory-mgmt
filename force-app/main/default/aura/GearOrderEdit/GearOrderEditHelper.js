({

    getGearOrder: function(component, orderID, orderName) {
        
        // retrieve Gear Order
        console.log('GearOrderEditHelper > getGearOrder - orderID: ' + orderID + ', orderName: ' + orderName);        
        
        // isLoading controls the spinner to indicate processing
        component.set('v.isLoading', true);
        
        // Create the action
        var doAction = true;
        var action = component.get("c.getGearOrder"); // method on the GearOrderController
        if (orderID != '') {
            action.setParams({
                "orderID": orderID
            });
        } else if (orderName != '') {
            action.setParams({
                "orderName": orderName
            });            
        } else {
            // no input parameters to find Order
            doAction = false;
        }
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > getGearOrder response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                
               	// orderList                
                var orderList = response.getReturnValue();
            	//console.log('GearOrderEditHelper > getGearOrder orderList: ' + JSON.stringify(orderList));
                
                if (orderList.length > 0) {
                    var order = orderList[0];
                    component.set("v.order", order);
                    component.set("v.orderID", order.Id);
                    component.set("v.orderName", order.Name);
                    
                    this.getGearOrderItems(component, order.Id);
                }
                
            }
            else {
                console.log("GearOrderEditHelper > getGearOrder - failed with state: " + state);
            }
        });

        // Send action off to be executed
        if (doAction) {
        	$A.enqueueAction(action);
        }
        
    }, // end getGearOrder  

    getGearOrderItems: function(component, orderID) {
        // return
        var orderItemList = null; 
        
        // retrieve Gear Order Items
        console.log('GearOrderEditHelper > getGearOrderItems - orderID: ' + orderID);        
        
        // Create the action
        var doAction = true;
        var action = component.get("c.getGearOrderItems"); // method on the GearOrderController
        if (orderID != '') {
            action.setParams({
                "orderID": orderID
            });
        } else {
            doAction = false;
        }
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > getGearOrderItems response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                
                // orderItemList                
                orderItemList = response.getReturnValue();
            	console.log('GearOrderEditHelper > getGearOrderItems orderItemList: ' + JSON.stringify(orderItemList));                
                component.set("v.orderItemList", orderItemList);
                
                // set table data
                this.setOrderItemsTableData(component, orderItemList);
            }
            else {
                console.log("GearOrderEditHelper > getGearOrderItems - failed with state: " + state);
            }
        });

        // Send action off to be executed
        if (doAction) {
        	$A.enqueueAction(action);
        }
        
        if (orderItemList == null) {
            orderItemList = new Array();
        }
        
        return orderItemList;
    }, // end getGearOrderItems  
    
    // FOR ORDER ITEM TABLE
    
    setOrderItemsTableData: function(component, orderItemList) {
        console.log('GearOrderEditHelper > setOrderItemsTableData orderItemList: ' + JSON.stringify(orderItemList));  
        
        // subset of order item data
        var data = Array();        
        for (var i = 0; i < orderItemList.length; ++i) {
            var item = orderItemList[i];
            var dataItem = {};
            dataItem.Name = item.Name;
            dataItem.ProductCategory = item.Product__r.Family__c;
            dataItem.ProductName = item.Product__r.Name;
            dataItem.Quantity = item.Quantity__c;
            data.push(dataItem);
        }
        //console.log('GearOrderEditHelper > setOrderItemsTableData data: ' + JSON.stringify(data));  
        
        // set table data
        component.set('v.tableData', data);
                        
        // stop the spinner
        component.set('v.isLoading', false);
        
        // sort table by order item 'Name'
        var fieldName = 'Name';
        var sortDirection = 'asc';
        this.updateColumnSorting(component, fieldName, sortDirection);
        
    }, // end setOrderItemsTableData  

    updateColumnSorting: function(component, fieldName, sortDirection) {
		component.set('v.isLoading', true);
        // We use the setTimeout method here to simulate the async
        // process of the sorting data, so that user will see the
        // spinner loading when the data is being sorted.
        // Using var for 'this' because 'this.sortData' within the anonymous function isn't recognized
        // because 'this' inside the anonymous function is empty
        var helper = this; 
        setTimeout(function() {            
            console.log('GearOrderEditController > sort - fieldName: ' + fieldName + ', sortDirection: ' + sortDirection);
            component.set("v.sortedBy", fieldName);
            component.set("v.sortedDirection", sortDirection);
            helper.sortData(component, fieldName, sortDirection);
            component.set('v.isLoading', false);
        }, 0);        
    },
    
    sortData: function (component, fieldName, sortDirection) {
        var data = component.get("v.tableData");
        var reverse = sortDirection !== 'asc';

        data = Object.assign([],
            data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
        );
        component.set("v.tableData", data);
    },
    
    sortBy: function (field, reverse, primer) {
        var key = primer
            ? function(x) { return primer(x[field]) }
            : function(x) { return x[field] };

        return function (a, b) {
            var A = key(a);
            var B = key(b);
            return reverse * ((A > B) - (B > A));
        };
    },    
    
    // FOR MODAL DIALOG
    
	getProductSelection: function(component) {
        console.log('GearOrderEditHelper > getProductSelection');        
        
        // Create the action
        var action = component.get("c.getProductSelection"); // method on the GearOrderController
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > getProductSelection response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                
                // productList                
                var productList = response.getReturnValue();
            	//console.log('GearOrderEditHelper > getProductSelection: ' + JSON.stringify(productList)); 

				// productMap
                var productMap = new Map();
                
                for (var i = 0; i < productList.length; ++i) {
                    var product = productList[i];
                    var category = product.Family__c;
                    var categoryProductList = null;
                    if (productMap.get(category) == undefined) {
                        categoryProductList = new Array();
                    } else {
                        categoryProductList = productMap.get(category);                        
                    }
                    categoryProductList.push(product);
                    productMap.set(category, categoryProductList); 
                }                
                //console.log('productListController > productMap: ' + JSON.stringify(productMap));

                var optionList = new Array();
                for (var [key, value] of productMap) {
                    optionList.push({'label': '------ CATEGORY: ' + key.toUpperCase() + ' ------', 'Id': 'category'});
                    var products = value;
                    for (var i = 0; i < products.length; ++i) {
                        var product = products[i];
                        optionList.push({'label': product.Name, 'Id': product.Id, 'itemBundle': product.Item_Bundle__c});
                    }
				}
				//console.log('productListController > optionList: ' + JSON.stringify(optionList));

                component.set("v.orderItem_productOptionList", optionList);
                
            }
            else {
                console.log("GearOrderEditHelper > getProductSelection - failed with state: " + state);
            }
        });

        // Send action off to be executed
		$A.enqueueAction(action);
        
    }, // end getProductSelection  
    
    createGearOrderItem: function(component, orderItem) {
        
        console.log('GearOrderEditHelper > createGearOrderItem - ' + JSON.stringify(orderItem));
        
        // Create the action
        var action = component.get("c.createGearOrderItem"); // method on the GearOrderController
        action.setParams({
            "orderID": orderItem.Gear_Order__c,
            "demographicID": orderItem.Gear_Order_Demographic__c,
            "productID": orderItem.Product__c,
            "quantity": orderItem.Quantity__c
        });
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > createGearOrderItem response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                var orderItem = response.getReturnValue();
                var orderID = orderItem.Gear_Order__c;
                console.log('GearOrderEditHelper > createGearOrderItem - orderItem created: ' + JSON.stringify(orderItem));
                
                // refresh gear order to show updated list of order items
                this.getGearOrder(component, orderID);
            }
            else {
                console.log("GearOrderEditHelper > createGearOrderItem - failed with state: " + state);
            }
        });

        // Send action off to be executed
		$A.enqueueAction(action);
        
    }, // end createGearOrderItem

    updateGearOrderItem: function(component, orderItem) {
        
        console.log('GearOrderEditHelper > updateGearOrderItem - ' + JSON.stringify(orderItem));
        
        // Create the action
        var action = component.get("c.updateGearOrderItem"); // method on the GearOrderController
        action.setParams({
            "orderID": orderItem.Gear_Order__c, // only passed in so that it will be returned with the orderItem
            "orderItemID": orderItem.Id,
            "productID": orderItem.Product__c,
            "quantity": orderItem.Quantity__c,
            "gender": orderItem.Gender__c,
            "season": orderItem.Season__c,
            "clothingSize": orderItem.Clothing_Size__c,
            "diaperSize": orderItem.Diaper_Size__c
        });
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > updateGearOrderItem response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                var orderItem = response.getReturnValue();
                var orderID = orderItem.Gear_Order__c;
                console.log('GearOrderEditHelper > updateGearOrderItem - orderItem updated: ' + JSON.stringify(orderItem));
                
                // refresh gear order to show updated list of order items
                this.getGearOrder(component, orderID);
            }
            else {
                console.log("GearOrderEditHelper > createGearOrderItem - failed with state: " + state);
            }
        });

        // Send action off to be executed
		$A.enqueueAction(action);
        
    }, // end updateGearOrderItem    

    deleteGearOrderItem: function(component, orderItem) {
        
        console.log('GearOrderEditHelper > deleteGearOrderItem - ' + JSON.stringify(orderItem));
        
        // Create the action
        var action = component.get("c.deleteGearOrderItem"); // method on the GearOrderController
        action.setParams({
            "orderID": orderItem.Gear_Order__c, // only passed in so that it will be returned with the orderItem
            "orderItemID": orderItem.Id
        });
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > deleteGearOrderItem response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                var orderItem = response.getReturnValue();
                var orderID = orderItem.Gear_Order__c;
                console.log('GearOrderEditHelper > deleteGearOrderItem - orderItem deleted: ' + JSON.stringify(orderItem));
                
                // refresh gear order to show updated list of order items
                this.getGearOrder(component, orderID);
            }
            else {
                console.log("GearOrderEditHelper > createGearOrderItem - failed with state: " + state);
            }
        });

        // Send action off to be executed
		$A.enqueueAction(action);
        
    }, // end deleteGearOrderItem
    
    setOrderItemFields: function(component, orderItemRow) {
        console.log('GearOrderEditHelper > orderItemRow: ' + JSON.stringify(orderItemRow));
        
        // get orderItem
        var orderItem;
        var orderItemList = component.get("v.orderItemList");
        //console.log('GearOrderEditHelper > orderItemList: ' + JSON.stringify(orderItemList));
        for (var i = 0; i < orderItemList.length; ++i) {
            var item = orderItemList[i];
            if (item.Name == orderItemRow.Name) {
                orderItem = item;
            }
        }
        console.log('GearOrderEditHelper > orderItem: ' + JSON.stringify(orderItem));
        
        // show additional fields by product name
        var productID = orderItem.Product__c;
        this.productSelected(component, productID);
        
        /** not needed 
        // product selection
        var productList = component.get('v.orderItem_productOptionList');
        for (var i = 0; i < productList.length; ++i) {
            var product = productList[i];
            if (product.value == orderItem.Product__c) {
                productList[i].selected = true;
                console.log('GearOrderEditHelper > edit order item - product selection: ' + JSON.stringify(productList[i])); 
            }
        }                       
        component.set('v.orderItem_productOptionList', productList);  
        */
        
        // update orderItem attribute
        component.set("v.orderItem", orderItem);

    }, // setOrderItemFields
    
	productSelected: function(component, productID) {
        
        console.log('GearOrderEditHelper > productSelected - productID: ' + productID);

        // product name
        var product;
        var productList = component.get('v.orderItem_productOptionList');
        for (var i = 0; i < productList.length; ++i) {
            var p = productList[i];
            if (productID == p.Id) {
                //productName = productList[i].label; 
                product = p;             
            }
        }   
        console.log('GearOrderEditHelper > productSelected: ' + JSON.stringify(product)); 
        
        // show additional fields by product name
        this.showAdditionalOrderItemFields(component, product);
 
    }, // end productSelected
    
    showAdditionalOrderItemFields: function(component, product) {
        
        var productName = product.label;
        var itemBundle = product.itemBundle;
        
        // label - quantity/bundle
        var quantityLabel;
        if ((itemBundle) && itemBundle > 1) { quantityLabel = "Bundles (" + itemBundle + " items per bundle)"; }
        else { quantityLabel = "Quantity"; }
        var label = component.set("v.orderItem_quantityLabel", quantityLabel);
        
        // check 'clothing'
        if (productName.toLowerCase().search('clothing') != -1) {
            console.log('GearOrderEditHelper > showAdditionalOrderItemFields - product is clothing');
            component.set("v.isClothing", true);
        } else {
            component.set("v.isClothing", false);
        }
        
        // check 'diapers'
        if (productName.toLowerCase().search('diapers') != -1) {
            console.log('GearOrderEditHelper > showAdditionalOrderItemFields - product is diapers');  
            component.set("v.isDiapers", true);
        } else {
            component.set("v.isDiapers", false);
        }
        
    }, // end showAdditionalOrderItemFields
    
    loadPicklistValues: function(component) {
        var componentAttribute;
        var objectName;
        var field;
        
        // gender options
        componentAttribute = 'orderItem_genderOptionList';
        objectName = 'Gear_Order_Item__c';
        field = 'Gender__c';
        this.getPicklistValues(component, componentAttribute, objectName, field);  
        
        // season options
        componentAttribute = 'orderItem_seasonOptionList';
        objectName = 'Gear_Order_Item__c';
        field = 'Season__c';
        this.getPicklistValues(component, componentAttribute, objectName, field); 
        
        // clothingSize options
        componentAttribute = 'orderItem_clothingSizeOptionList';
        objectName = 'Gear_Order_Item__c';
        field = 'Clothing_Size__c';
        this.getPicklistValues(component, componentAttribute, objectName, field); 
        
        // diaperSize options
        componentAttribute = 'orderItem_diaperSizeOptionList';
        objectName = 'Gear_Order_Item__c';
        field = 'Diaper_Size__c';
        this.getPicklistValues(component, componentAttribute, objectName, field); 
        
    }, // end loadPicklistValues
    
    getPicklistValues: function(component, componentAttribute, objectName, field) {
        
        console.log('GearOrderEditHelper > getPicklistValues - componentAttribute: ' + componentAttribute + ', objectName: ' + objectName + ', field: ' + field);
        
        // Create the action
        var action = component.get("c.getPicklistValues"); // method on the GearOrderController
        action.setParams({
            "obj": {sobjectType : objectName},
            "field": field
        });
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            console.log('GearOrderEditHelper > getPicklistValues response: ' + response.getState())
            var state = response.getState();
            if (state === "SUCCESS") {
                var options = response.getReturnValue();
                console.log('GearOrderEditHelper > getPicklistValues - returnValue: ' + JSON.stringify(options));
            	component.set("v." + componentAttribute, options);
            }
            else {
                console.log("GearOrderEditHelper > getPicklistValues - failed with state: " + state);
            }
        });

        // Send action off to be executed
		$A.enqueueAction(action);
        
    }, // end getPicklistValues
	 
       
});
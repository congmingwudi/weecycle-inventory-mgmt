trigger GearOrderTrigger on Gear_Order__c (before insert, before update) {
    
    if (trigger.isInsert || trigger.isUpdate) {
        for(Gear_Order__c order: trigger.new) {
        	System.debug('GearOrderTrigger >> order: ' + order);
            if (order.Order_Status__c == 'Submitted' && order.Line_Items__c == 0) {
                trigger.newMap.get(order.Id).addError('Add at least one line item to submit the order.');       
            } else if (order.Order_Status__c == 'Fulfilled' && order.Line_Items_Fulfilled__c == 0) {
                trigger.newMap.get(order.Id).addError('Fulfill at least one line item to fulfill the order, or cancel the order.');       
            }
        }        
	} 
    /* else if (trigger.isDelete) {
        // decide if we want to allow deleting Gear Orders
    }
	*/
}
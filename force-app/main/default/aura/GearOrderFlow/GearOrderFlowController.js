({
    init: function(component, event, helper) {
        console.log('NewGearOrderFlowController > doInit');
        
        var flowName = "NewGearOrder";
        
        // find the view component (by aura:id) where the flow will be displayed
        var flow = component.find(flowName);
        
        // start the flow by the flow Unique Name
        flow.startFlow(flowName);
        
    } // end init
})
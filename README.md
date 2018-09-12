# weecycle-inventory-mgmt-private

Salesforce inventory management app for WeeCycle.org to manage pickups, donation items, and partner orders.

This is a Salesforce DX project.

## Documentation

WeeCycle-Salesforce (powerpoint presentation) -> https://tinyurl.com/weecycle-salesforce

WeeCycle-Salesforce-technical (powerpoint presentation) -> https://tinyurl.com/weecycle-salesforce-technical


## Deploy to a scratch org

Steps for configuring this app in a scratch org:

Open a terminal/command prompt. 

Under /scripts, run "1.authenticate-dev-hub.sh" and login to your Dev Hub org.

Run "2.setup-scratch-org.sh" to create and open a scratch org.

In the scratch org, create an org wide email address with display name "WeeCycle", select "Allow All Profiles to Use this From Address", and verify it.

In /force-app/main/default/workflows/Gear_Order__c.workflow-meta.xml, replace all sender addresses with the same email address you used for the org wide email address within <code> &lt;senderAddress&gt; &lt;/senderAddress&gt;</code>.

Run "3.push-code.sh" to push the app code to the scratch org, import sample data, and open the scratch org. 

In Setup, clone the process builder flow "Gear Order Submitted" and in the action "Update Order", update the "Owner ID" to your user for this scratch org. Select the user named "User User". The flow embeds the user record ID here, so this needs to be changed for each new scratch org. Active the updated flow.

Similar updates need to be made for the task creation actions in the process builder flows: "Gear Order Scheduled", "Gear Order Confirmed", and "Gear Order Fulfilled". Update the "Assigned To ID" to "User User". 

## Run app

See a complete walkthrough of the solution provided by this app in the [documentation](#documentation).

In the App Launcher, go to the "WeeCycle Inventory" app.

Pickups are typically done from the Salesforce mobile app. 

The gear order form is exposed to unauthenticated users by making the VisualForce page "NewGearOrderFlowLightningOutAppPage" available through Sites and embedding it into an iframe. For WeeCycle, this page is iframed into a Wordpress site. The public profile for the Salesforce Site must provide access to the WeeCycle Inventory custom objects. An example profile is included in this project under /sites-config. 

Without a site configured for the gear order form, you can launch the gear order form under Setup by previewing "NewGearOrderFlowLightningOutAppPage" VisualForce page.

USER_ALIAS="${USER_ALIAS:-WeeCycle_Scratch}"
echo importing donation locations into org w/ USER_ALIAS = $USER_ALIAS
sfdx force:data:tree:import -u $USER_ALIAS -p ./data/Donation_Location__c-plan.json
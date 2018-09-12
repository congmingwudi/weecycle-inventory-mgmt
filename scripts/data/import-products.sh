USER_ALIAS="${USER_ALIAS:-WeeCycle_Scratch}"
echo importing products into org w/ USER_ALIAS = $USER_ALIAS
sfdx force:data:tree:import -u $USER_ALIAS -p ./data/Product__c-plan.json
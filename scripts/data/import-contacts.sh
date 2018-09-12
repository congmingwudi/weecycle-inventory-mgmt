USER_ALIAS="${USER_ALIAS:-WeeCycle_Scratch}"
echo importing contacts into org w/ USER_ALIAS = $USER_ALIAS
sfdx force:data:tree:import -u $USER_ALIAS -p ./data/Contact-plan.json
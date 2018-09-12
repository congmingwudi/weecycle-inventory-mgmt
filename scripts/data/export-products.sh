USER_ALIAS="${USER_ALIAS:-WeeCycle_Scratch}"
sfdx force:data:tree:export -q soql/select-products.soql --json -d ./data -p -u $USER_ALIAS
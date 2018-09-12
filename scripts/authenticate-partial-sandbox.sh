USER_ALIAS=WeeCycle_Partial_Sandbox
LOGIN_URL=https://cs17.salesforce.com
echo authenticating org w/ USER_ALIAS = $USER_ALIAS and LOGIN_URL = $LOGIN_URL
sfdx force:auth:web:login -a $USER_ALIAS -r $LOGIN_URL
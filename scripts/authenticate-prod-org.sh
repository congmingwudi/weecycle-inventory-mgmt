USER_ALIAS=WeeCycle_Prod
LOGIN_URL=https://weecycle.my.salesforce.com
echo authenticating org w/ USER_ALIAS = $USER_ALIAS and LOGIN_URL = $LOGIN_URL
sfdx force:auth:web:login -a $USER_ALIAS -r $LOGIN_URL
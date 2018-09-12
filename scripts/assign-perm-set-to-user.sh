USER_ALIAS="${USER_ALIAS:-WeeCycle_Scratch}"
# perm set 1
PERM_SET=WeeCycle
echo assigning permission set $PERM_SET to USER_ALIAS = $USER_ALIAS
sfdx force:user:permset:assign -n $PERM_SET -u $USER_ALIAS
# perm set 2
PERM_SET=Dashboard_Permissions
echo assigning permission set $PERM_SET to USER_ALIAS = $USER_ALIAS
sfdx force:user:permset:assign -n $PERM_SET -u $USER_ALIAS
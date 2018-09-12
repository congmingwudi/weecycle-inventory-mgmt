USER_ALIAS="${USER_ALIAS:-WeeCycle_Scratch}"
echo import sample data into org w/ USER_ALIAS = $USER_ALIAS
./import-accounts.sh
./import-contacts.sh
./import-donation-locations.sh
./import-products.sh
# export unmanaged package into temp dir
mkdir temp
sfdx force:mdapi:retrieve -s -r ./temp -u WeeCycle_Partial_Sandbox -p WeeCycle_Inventory_Mgmt
unzip ./temp/unpackaged.zip -d ./temp/
# convert Meta-data API source to Salesforce DX project structure
sfdx force:mdapi:convert -r ./temp -d ../force-app/
# delete temp dir
rm -rf ./temp

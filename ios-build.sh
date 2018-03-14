# Custom script to update ios app under dev 

echo 'STEP 1 - Save plugins '
cordova plugin save -d
echo ''

echo 'STEP 2 - Remove ios platform '
cordova platform rm ios
echo ''

echo 'STEP 3 - add ios platform '
cordova platform add ios
echo ''

echo 'STEP 4 - Launch project in Xcode'
open ./platforms/ios/YourApp.xcworkspace/
echo ''
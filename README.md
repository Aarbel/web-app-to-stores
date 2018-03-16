This repo is based on Cordova and you just have 1 javascript configuration file
to run your website or SPA inside and app :tada: 

**Will Apple approve the app if it just wraps a site?**
```
Apple guidelines : 
…
2.12 Apps that are not very useful, unique, are simply web sites bundled as Apps, or do not provide any lasting entertainment value may be rejected
```
This rule is quite balanced if your web app just allows restricted url access and provides a really reactive and responsive app-like experience. Many companies have their app on the stores with this approach, in my case that worked.


**I'll provide PWA features later, i'm looking right now for a partner 
with an experience with Cordova plugins and Objective C / Java.**

## WIP

- Add linters
- Add Service Workers support 
- Add Dev and Prod env variables for tests with localhost url 
- Write a better doc for a very simple deployment for !mobile developers

## Main plugins used

- Offline / Online detection
- Webview shrinks on IOS instead of keyboard overflow
- Autofill login credentials on your app 

## Configuration

Just grep `yourapp` and `yourteam` in the repo to replace the fields with 
your own informations (your url, your App name, your Team name)

## Install :coffee:

install cordova-cli (tool to build cordova apps)...
> npm i -g cordova

### IOS : Start and Update platform + launch Xcode
> ./ios-build.sh

### Android : Start platform with console output
> cordova run android && adb logcat chromium:D SystemWebViewClient:D *:S


## Little tips about Cordova file structure

1 - Cordova configurations are managed with `config.xml`
2 - Main files are in `www/` directory. 
3 - Icons files are in `res/` 
4 - When the app starts on your phone, `index.html` and `js/index.js` are loaded.
(https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html)


/**
 * Configuration of Cordova App
 */

var app = {
    /** Application Constructor */
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    onNetworkOnline: function() {
        /** Uncomment for dev, with your own local ip */
        window.location = 'https://mobile.yourapp.com';
        navigator.splashscreen.hide();
    },

    onNetworkOffline: function() {
        window.location = 'offline.html';
        navigator.splashscreen.hide();
    },

    /** 
     * deviceready Event Handler
     * Bind any cordova events here. Common events are:
     * 'pause', 'resume', etc.
     */
    onDeviceReady: function() {

        /** 
         * 
         * MANAGE PLATFORMS EXCEPTIONS 
         * 
         */
        const currentPlatform = device.platform
        if (currentPlatform == 'browser') {
            window.location = 'https://mobile.yourapp.com';
            navigator.splashscreen.hide();
            return
        }
        if (currentPlatform == 'Android') {
            /** Set the color of the Status Bar on Android */
            StatusBar.backgroundColorByHexString("#060d2d");
        }
        if (currentPlatform == 'iOS') {

            /** Fix : Avoid to push up the viewport content when keyboard is open */
            Keyboard.shrinkView(true);
            /** Fix : always allow scrolling when the view is shrinked by the keyboard */
            Keyboard.disableScrollingInShrinkView(false);
            
            // TODO : Enhancement : Uncomment when inputs and textarea onblur will be managed
            // Keyboard.hideFormAccessoryBar(true);

            /** Manage the camera access on IOS */
            cordova.plugins.diagnostic.requestCameraRollAuthorization(function(status){
                console.log("Authorization request for camera roll was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
            }, function(error){
                console.error(error);
            });
        }


        /** 
         * 
         * MANAGE CONNEXION STATUS
         * 
         */
        document.addEventListener('online', this.onNetworkOnline.bind(this), false)
        document.addEventListener('offline', this.onNetworkOffline.bind(this), false)
        /** 
         * Connection events aren't always fired ... So we try to get the 
         * connection status when device is ready
         */
        const connectionState = navigator.connection.type
        if (connectionState === Connection.NONE || connectionState === Connection.UNKNOWN) {
            this.onNetworkOffline()
        } else {
            this.onNetworkOnline()
        }

    },
};

app.initialize();

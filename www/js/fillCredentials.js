
/**
 * Utilitary to fill login credentials inside the webview
 */
function showSecurityLackMessage() {
    const storage = window.localStorage
    const showSecurityLackKey = 'showSecurityLack'
    const showMessage = storage.getItem(showSecurityLackKey)

    if (showMessage === 'false') {
        return
    }

    navigator.notification.confirm(
        'Impossible to store your ids. The cause could be a global lock on ' +
        'your phone',

        function(buttonIndex) {
            if (buttonIndex === 1) {
                storage.setItem(showSecurityLackKey, false)
            } else {
                storage.setItem(showSecurityLackKey, true)
            }
        },

        'Save your login ids',
        ["Ok", "Remind later"]
    )
}

const Store = function() {
    this._ss = null
}

Store.prototype = {
    _setLsKeyValue: function(key, value) {
        try {
            window.localStorage.setItem(key, value)
        } catch (error) {
            console.error(error)
        }
    },

    _getSsValueFromKey: function(key, callback) {
        this._ss.get(
            function(value) {
                callback(value)
            },

            function(error) {
                console.error(error)
                console.log('Return the value of ' + key + ' from local storage')
                callback(window.localStorage.getItem(key))
            },

            key
        )
    },

    _setSsKeyValue: function(key, value) {
        const self = this

        this._ss.set(
            function(key) {

            },

            function(error) {
                console.error(error)
                console.warn(key + ' will be stored in local storage')
                self._setLsKeyValue(key, value)
            },

            key, value
        )
    },

    init: function(callback) {
        const self = this

        this._ss = new cordova.plugins.SecureStorage(
            function() {
                // Success
                console.log('Secure storage is instantiate !')
                callback(self)
            },

            function() {
                // Error
                if (cordova.platformId == 'android') {
                    //https://github.com/Crypho/cordova-plugin-secure-storage#users-must-have-a-secure-screen-lock-set
                    showSecurityLackMessage()
                }
                console.error('Impossible to use Secure storage, values will be stored in local storage')
                self._ss = null
                callback(self)
            },

            'yourapp'
        )
    },

    get: function(key, callback) {
        // We must use a callback to return the value because of SecureStorage plugin ...
        // Me should use promises
        if (this._ss) {
            this._getSsValueFromKey(key, callback)
        } else {
            callback(window.localStorage.getItem(key))
        }
    },

    set: function(key, value) {
        if (this._ss) {
            this._setSsKeyValue(key, value)
        } else {
            this._setLsKeyValue(key, value)
        }
    }
}

function retrieveCredentials(store) {
    store.get('savedEmail', function(savedEmail) {
        store.get('savedPassword', function(savedPassword) {
            const emailField = document.getElementsByName('email')[0]
            const passwordField = document.getElementsByName('password')[0]

            const submitButton = document.getElementsByTagName('button')[0]

            submitButton.addEventListener('click', function() {
                if (emailField.value !== savedEmail) {
                    store.set('savedEmail', emailField.value)
                }

                if (passwordField.value !== savedPassword) {
                    store.set('savedPassword', passwordField.value)
                }
            }, false)

            if (savedEmail) {
                emailField.value = savedEmail
            }

            if (savedPassword) {
                passwordField.value = savedPassword
            }
        })
    })
}

// Callback hell !!!!
document.addEventListener('deviceready', function() {
    const location = window.location.pathname

    if (location.substr(0, '/login'.length) === '/login') {
        const store = new Store()

        store.init(retrieveCredentials)
    }
})

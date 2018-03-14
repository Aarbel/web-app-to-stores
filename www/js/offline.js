/**
 * Used in Offline page to refresh the app if users asks for it 
 */

function retryToAccessUrl() {
    const connectionState = navigator.connection.type

    if (connectionState !== Connection.NONE && connectionState !== Connection.UNKNOWN) {
        window.location = 'https://mobile.yourapp.com'
    }
}

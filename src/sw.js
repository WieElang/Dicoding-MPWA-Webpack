importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { cacheNames, setCacheNameDetails } = workbox.core
const { precacheAndRoute } = workbox.precaching
const { registerRoute } = workbox.routing
const { StaleWhileRevalidate, CacheFirst } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse

setCacheNameDetails({
    prefix: 'footballapps',
    suffix: 'v1',
    precache: 'app-shell',
    runtime: 'external-resource',
})

function page([_page, revision]){
    return [
        [`${_page}/${_page}.html`, revision],
        [`${_page}/${_page}.css`, revision],
        [`${_page}/${_page}.js`, revision],
    ]
}

function apply(context, files){
    return files.map(([file, revision]) =>({
        url: context + file,
        revision,
    }))
}

precacheAndRoute(self.__WB_MANIFEST, {
ignoreURLParametersMatching: [/.*/],
})

registerRoute(
    /https:\/\/api\.football-data\.org\/v2/,
    new StaleWhileRevalidate({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
)

self.addEventListener('push', function(event){
    let body
    if (event.data) {
        body = event.data.text()
    }else{
        body = 'Push message no payload'
    }
    const options = {
        body: body,
        icon: 'web_icon.png',
        vibrate: [100 , 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    }
    event.waitUntil(self.registration.showNotification('Push Notification', options))
})
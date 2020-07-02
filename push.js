const webPush = require("web-push")

const vapidKeys = {
    "publicKey": "BAj7TiNavaNOgDJhYwoLu3YWmNY_7hCQw9Lb6AZ2cBFXOszoyVBOxsH74mJ76IS9Z5x3odXnEJjeTZO7JONT-PQ",
    "privateKey": "2dZwK27mj36deGLSSGlCO5sDhIBTXmmIdkR6_DXWWsM"
}

webPush.setVapidDetails(
    'mailto:elangsurya66@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dYbCdT9abrU:APA91bFNmntgNM2kR9Dk44_r6RTiTIJAwKNyykIALKBLI_KfSy6bLKxg7ofBd_q-1ilVFIJ0hHiqMkEGZzcYQ2abEJ00DMh8WmLumk5vtlnw7TdORCdGsBK4U3jqbay3yl3wF0Ckok-e",
    "keys": {
        "p256dh": "BLTcIsOq8pbyYnBWxZlHgUKydHyGNWOmRKscossMhKs+UDmlgpZV6y098P2pn2k7OTg6lPitNmSp1IvvqqMkzUY=",
        "auth": "+emGEAcqC8ROCneTVC0eSA=="
    }
}

const payload = "Hello, Check our football catalogue!"

const options = {
    gcmAPIKey: "258852538800",
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)
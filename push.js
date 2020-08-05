const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BDyzryZ-NuYhwb9WmgXENhmWTCN11VX_XjWHnGL_7daiQj8RSHWXl6PvJDMtjwgSo7a7z4jW5Br4htB71R9w-Hw",
    "privateKey": "xa86hwboi0SeDhy1nR_u7dWtwCufFZnaJ_6BMUAtnmA"
};

webPush.setVapidDetails(
    'mailto:fiqrikm18@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/d7hxVZcYUmM:APA91bEbYV7lYLZI18_bsrpii7f1KagbtXS-wflA1UjM8ls3aMsTzAXQTVkiEBQnQKhpeMVD6EyCJgHQWTayNEI4GmRUuw7u0_KCw3zObdFZ6_owbmN9oWMLhz_I3u7zPKw-9pLc6rQ7",
    "keys": {
        "p256dh": "BEVkXiFuGDCRWCvG7A/B2gGhse/1x63X8C4PyWsfakOo0cJDide4rvmDLKkI/t2sxJnj9SvS8K2fgRegMeXYcaU=",
        "auth": "g5PbhpwVccEynTSIOUX63w=="
    }
};

const payload = "Notification from Football App";
const options = {
    gcmAPIKey: "525230125876",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
import FCM from "fcm-node";
import { findAll } from "../services/notification.service.js";


const sendPushNotification = async (userId, message) => {
    try {
        var serverKey = process.env.FCM_SERVER_KEY;
        var fcm = new FCM(serverKey);
        var token = await findAll(userId);
        var reg_ids = [];
        token.forEach(token => {
            reg_ids.push(token.fcm_token)
        })
        if (token) {
            var pushMessage = {
                registration_ids: reg_ids,
                content_available: true,
                mutable_content: true,
                notification: {
                    body: message,
                    icon: 'myicon',
                    sound: 'mySound',
                    // badge: 1
                },
                // data: {
                //   notification_type: 5,
                //   conversation_id:inputs.user_id,
                // }
            };

            fcm.send(pushMessage, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong", err);
                } else {
                    console.log("Push notification sent", response);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    sendPushNotification
}
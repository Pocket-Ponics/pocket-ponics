import { Expo } from 'expo-server-sdk';
import mySQL from './mySQLController';

exports.sendSeedlingAndTierNotifications = () => {
    //Find all users where greenhouse seedling_time == today 
    mySQL.getReadySeedlings(function(err, rec) {
        if(err)
        {
            console.log("Couldn't get ready seedlings")
        } 
        else {
            sendNotificationsToExpo(rec, "Your Seedlings Are Ready", 'Seedlings')
        }
    })

    //Find all users where tier cycle_time == today 
    mySQL.getReadyTiers(function(err, rec) {
        if(err)
        {
            console.log("Couldn't get ready tiers")
        } 
        else {
            sendNotificationsToExpo(rec, "Your Tier is Ready", 'Tier')
        }
    })
}

exports.sendGreenhouseNotification = (user_id, greenhouse_id, message, type) => {
    mySQL.getGreenhouseForNotification(user_id, greenhouse_id, function(err, rec) {
        if(err)
        {
            console.log("Could not get greenhouse for notification")
        }
        else
        {
            sendNotificationsToExpo(rec, message, type)
        }
    })
}

function sendNotificationsToExpo(rec, message, type){
    // Create a new Expo SDK client
    let expo = new Expo();

    // Create the messages that you want to send to clents
    var messages = [];

    rec.rows.forEach(row => {
        // Check that all your push tokens appear to be valid Expo push tokens
        if (Expo.isExpoPushToken(row.device_key)) {
            messages.push({
                to: row.device_key,
                sound: 'default',
                body: message,
                data: { payload: row, type: type, body: message},
            })
        } 
        else
        {
            console.error(`Push token ${row.device_key} is not a valid Expo push token`);
        }
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();
}
const { google } = require('googleapis');
const moment = require('moment');


const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const callbackURL = 'http://localhost:3000/google/return';

const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, callbackURL);

const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: 'https://www.googleapis.com/auth/analytics.readonly'
});

const analytics = google.analytics({
  version: 'v3',
  auth: oauth2Client,
});


oauth2Client.on('tokens', (tokens) => {
	console.log('OVdeee sammmm ');
 	console.log(tokens);
});


const getAnalytics = async () => {
	const viewId = process.env.viewID;
	console.log('Getting google analytics');

	console.log('---------------------')
	try {
		const { data } = await analytics.data.ga.get({
			ids: 'ga:' + viewId,
		    auth: oauth2Client,
		    'start-date': '30daysAgo',
	    	'end-date': 'today',
	    	'metrics': 'ga:pageviews'
		});
	} catch (e) {
        console.log('Errorr', e);
    }
	// console.log(data);

}

module.exports = {
	oauth2Client,
	getAnalytics
}
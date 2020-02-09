const { google } = require('googleapis');
const moment = require('moment');


const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const callbackURL = 'http://localhost:3000/google/return';

const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, callbackURL);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    prompt: 'consent'
});

const analytics = google.analytics({
  version: 'v3',
  auth: oauth2Client,
});


const getAnalytics = async () => {
	const credentials =	Object.keys(oauth2Client.credentials).length;
	if (!credentials) {
		oauth2Client.setCredentials({
		  refresh_token: process.env.analyticsRefreshToken
		});
	}
	console.log('Getting google analytics');
	try {
		const { data } = await analytics.management.profiles.list({
				accountId: '~all',
				webPropertyId: '~all',
				auth: oauth2Client
		});
		const view = { id: data.items[0].id, website: data.items[0].websiteUrl };

		console.log(view);
		const { data: result } = await analytics.data.ga.get({
			ids: 'ga:' + process.env.viewID,
		    auth: oauth2Client,
		   'start-date': '7daysAgo',
		   'end-date': 'today',
		   'dimensions': 'ga:date',
  		   'metrics': 'ga:pageviews',
		});
		const { rows } = result;
		const response = rows.map((e) => {
			return {
				date: moment(e[0]).format("DD/MM"),
				count: parseInt(e[1], 10)
			};
		});

		return response;

	} catch (e) {
        console.log('Errorr', e);
        console.log(url);
   
    }

}

module.exports = {
	oauth2Client,
	getAnalytics
}
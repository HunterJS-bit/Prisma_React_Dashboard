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


const getAnalytics = () => {
	const viewId = process.env.viewID;

	// let now = moment().format('YYYY-MM-DD')
	// 	let aMonthAgo = moment()
	// 		.subtract(1, 'months')
	// 		.format('YYYY-MM-DD')
	// 	let repReq = [
	// 		{
	// 			viewId: viewSelected,
	// 			dateRanges: [
	// 				{
	// 					startDate: aMonthAgo,
	// 					endDate: now
	// 				}
	// 			],
	// 			metrics: [
	// 				{
	// 					expression: 'ga:hits'
	// 				}
	// 			],
	// 			dimensions: [
	// 				{
	// 					name: 'ga:day'
	// 				}
	// 			]
	// 		}
	// 	];
	console.log('Getting google analytics');

}

module.exports = {
	oauth2Client,
	getAnalytics
}
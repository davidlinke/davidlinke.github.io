const darkSkyAPIKey = '2180450fb6c595540f84351dfaa20450';
const mapQuestAPIKey = 'db5wGqWH4xQFSlu6TGvorQMoRG8daxn5';

// MORNING DEFINED AS 7AM TO 12PM
// AFTERNOON DEFINED AS 12PM TO 5PM
// EVENING DEFINED AS 5PM TO 10PM
// OVERNIGHT DEFINED AS 10PM TO 7AM

$('#zipCodeSubmit').on('click', () => {
	let zipcode = $('#zipCodeInput').val();
	// console.log(zipcode);
	getlatLong(zipcode);
});

const getlatLong = zipcode => {
	const mapQuestEndpoint = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestAPIKey}&location=${zipcode}`;

	$.ajax({
		url: mapQuestEndpoint
	}).then(data => {
		console.log(data.results[0].locations[0].latLng);
		const latLngObject = data.results[0].locations[0].latLng;
		getWeatherData(latLngObject);
	});
};

const getWeatherData = latLngObject => {
	const lat = latLngObject.lat;
	const lng = latLngObject.lng;

	// console.log(`lat is ${lat} and type ${typeof lat}`);
	// console.log(`lng is ${lng} and type ${typeof lng}`);

	const currentTime = Math.round(new Date().getTime() / 1000); // get unix time
	const tomorrowsTime = currentTime + 86400;

	const darkSkyEndpoint = `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${lng},${currentTime}?exclude=currently,flags,minutely,daily,alerts`;

	const darkSkyEndpointTomorrow = `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${lng},${tomorrowsTime}?exclude=currently,flags,minutely,daily,alerts`;

	// GET WEATHER DATA FOR TODAY
	$.ajax({
		url: darkSkyEndpoint,
		dataType: 'jsonp' // NEED TO SPECIFY THIS FOR IT TO WORK
	}).then(data => {
		console.log(data);
	});

	// GET WEATHER DATA FOR TOMORROW
	$.ajax({
		url: darkSkyEndpointTomorrow,
		dataType: 'jsonp'
	}).then(data => {
		console.log(data);
	});
};

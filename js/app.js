const darkSkyAPIKey = '2180450fb6c595540f84351dfaa20450';
const mapQuestAPIKey = 'db5wGqWH4xQFSlu6TGvorQMoRG8daxn5';
const ipapiAPIKey = '6221dfe254de5dc154060805d2ababcc';

const ipEndpoint = `http://api.ipapi.com/47.21.232.94?access_key=${ipapiAPIKey}&format=1`;

// GET IP ADDRESS
$.ajax({
	url: 'http://api.ipify.org?format=json'
}).then(data => {
	console.log(`IP address is: ${data.ip}`);
});

// GET ZIP CODE
$('#zipCodeSubmit').on('click', () => {
	let zipcode = $('#zipCodeInput').val();
	// console.log(zipcode);
	getLatLongAndTown(zipcode);

	// CLEAR EXISTING INFO
	// $('#results').empty();
});

// GET LAT & LNG & TOWN NAME FROM ZIP CODE
const getLatLongAndTown = zipcode => {
	const mapQuestEndpoint = `https://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestAPIKey}&location=${zipcode} United States`;

	$.ajax({
		url: mapQuestEndpoint
	}).then(data => {
		// console.log(data.results[0].locations[0]);
		// console.log(data.results[0].locations[0].adminArea5);
		// console.log(data.results[0].locations[0].latLng);
		const latLngObject = data.results[0].locations[0].latLng;
		const town = data.results[0].locations[0].adminArea5;
		getWeatherData(latLngObject, town);
	});
};

const getWeatherData = (latLngObject, town) => {
	const lat = latLngObject.lat;
	const lng = latLngObject.lng;

	// summarizePrecipitation(stamfordData, town);
	summarizePrecipitation(hawaiiData, town);

	// console.log(`lat is ${lat} and type ${typeof lat}`);
	// console.log(`lng is ${lng} and type ${typeof lng}`);

	// const currentTime = Math.round(new Date().getTime() / 1000); // get unix time
	// const tomorrowsTime = currentTime + 86400;

	// const darkSkyEndpoint = `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${lng},${currentTime}?exclude=currently,flags,minutely,daily,alerts`;

	// const darkSkyEndpointTomorrow = `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${lng},${tomorrowsTime}?exclude=currently,flags,minutely,daily,alerts`;

	// GET WEATHER DATA FOR TODAY
	// $.ajax({
	// 	url: darkSkyEndpoint,
	// 	dataType: 'jsonp' // NEED TO SPECIFY THIS FOR IT TO WORK
	// }).then(data => {
	// 	console.log(data);
	// });

	// GET WEATHER DATA FOR TOMORROW
	// $.ajax({
	// 	url: darkSkyEndpointTomorrow,
	// 	dataType: 'jsonp'
	// }).then(data => {
	// 	console.log(data);
	// });
};

// MORNING DEFINED AS 7AM TO 12PM
// AFTERNOON DEFINED AS 12PM TO 5PM
// EVENING DEFINED AS 5PM TO 10PM
// OVERNIGHT DEFINED AS 10PM TO 7AM

// precipProbability: The probability of precipitation occurring, between 0 and 1, inclusive.
// precipIntensity: The intensity (in inches of liquid water per hour) of precipitation occurring at the given time. This value is conditional on probability (that is, assuming any precipitation occurs at all).

const summarizePrecipitation = (darkSkyObject, town) => {
	// SUMMARIZE DATA BETWEEN START AND END TIME
	const segmentByTime = (startTime, endTime, darkSkyObject) => {
		let probability = 0;

		for (let i = startTime; i < endTime; i++) {
			const baseObject = darkSkyObject.hourly.data[i];
			// console.log(`Time is ${baseObject.time}`);
			// console.log(`Precipitation Intensity is ${baseObject.precipIntensity}`);
			// console.log(
			// 	`Precipitation Probability is ${baseObject.precipProbability}`
			// );

			// Get the largest of the probabilities
			if (baseObject.precipProbability > probability) {
				probability = baseObject.precipProbability;
			}
		}
		return probability;
	};

	// MORNING
	const morningProbability = segmentByTime(6, 10, darkSkyObject);
	// AFTERNOON
	const afternoonProbability = segmentByTime(11, 15, darkSkyObject);
	// EVENING
	const eveningProbability = segmentByTime(16, 20, darkSkyObject);

	console.log(
		`Morning chance of rain is ${morningProbability}. Afternoon chance of rain is ${afternoonProbability}. Evening chance of rain is ${eveningProbability}`
	);

	mainStatus(
		morningProbability,
		afternoonProbability,
		eveningProbability,
		town
	);

	addWeatherDataToPage(
		morningProbability,
		afternoonProbability,
		eveningProbability
	);
};

const addWeatherDataToPage = (
	morningChance,
	afternoonChance,
	eveningChance
) => {
	const phrasing = (timeOfDay, chanceOfRain) => {
		if (chanceOfRain === 0) {
			return `There is no chance of rain this ${timeOfDay}.`;
		} else {
			let chanceOfRainPercent = Math.floor(chanceOfRain * 100);
			return `There is a ${chanceOfRainPercent}% chance it will rain this ${timeOfDay}.`;
		}
	};

	const $morning = $('<h5>').text(phrasing('morning', morningChance));
	$('#morning').append($morning);

	const $afternoon = $('<h5>').text(phrasing('afternoon', afternoonChance));
	$('#afternoon').append($afternoon);

	const $evening = $('<h5>').text(phrasing('evening', eveningChance));
	$('#evening').append($evening);
};

const mainStatus = (morningChance, afternoonChance, eveningChance, town) => {
	if (morningChance > 0.5 || afternoonChance > 0.5 || eveningChance > 0.5) {
		const $status = $('<h3>').text(
			`Yes, definitely grab your umbrella in ${town} today!`
		);
		$('#results').prepend($status);
	} else if (
		morningChance > 0.2 ||
		afternoonChance > 0.2 ||
		eveningChance > 0.2
	) {
		const $status = $('<h3>').text(
			`Maybe, use your judgement based on when you will be outside in ${town} today.`
		);
		$('#results').prepend($status);
	} else {
		const $status = $('<h3>').text(`No, all clear today in ${town}!`);
		$('#results').prepend($status);
	}
};

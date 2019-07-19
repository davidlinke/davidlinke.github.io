//=================================================
// weather.js
//=================================================

//=================================================
// getWeatherData(latLngObject, town)
// Gets the weather data from dark sky for the given location
//=================================================
const getWeatherData = (latLngObject, town) => {
	const lat = latLngObject.lat;
	const lng = latLngObject.lng;

	summarizePrecipitation(stamfordData, town);
	// summarizePrecipitation(stamfordDataMaybeRain, town);
	// summarizePrecipitation(hawaiiData, town);

	// console.log(`lat is ${lat} and type ${typeof lat}`);
	// console.log(`lng is ${lng} and type ${typeof lng}`);

	// const currentTime = Math.round(new Date().getTime() / 1000); // get unix time

	// const darkSkyEndpoint = `https://api.darksky.net/forecast/${darkSkyAPIKey}/${lat},${lng},${currentTime}?exclude=currently,flags,minutely,daily,alerts`;

	// $.ajax({
	// 	url: darkSkyEndpoint,
	// 	dataType: 'jsonp' // NEED TO SPECIFY THIS FOR IT TO WORK
	// }).then(data => {
	// 	console.log(data);
	// 	summarizePrecipitation(data, town);
	// });
};

// precipProbability: The probability of precipitation occurring, between 0 and 1, inclusive.
// precipIntensity: The intensity (in inches of liquid water per hour) of precipitation occurring at the given time. This value is conditional on probability (that is, assuming any precipitation occurs at all).

//=================================================
// summarizePrecipitation(darkSkyObject, town)
// Takes the hourly weather information and summarizes it into morning, afternoon, and evening data
// Morning defined as 7AM to 12PM
// Afternoon defined as 12PM to 5PM
// Evening defined as 5PM to 10PM
//=================================================
const summarizePrecipitation = (darkSkyObject, town) => {
	// Hide loading animation
	pageUnload();
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

	displayResults();

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

	showRadar(darkSkyObject.latitude, darkSkyObject.longitude);
};

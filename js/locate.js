//=================================================
// locate.js
//=================================================

//=================================================
// getIP()
// Gets the IP address of the user
//=================================================
const getIP = () => {
	$.ajax({
		url: 'https://api.ipify.org?format=json'
	}).then(data => {
		console.log(`IP address is: ${data.ip}`);
		// Call getZipFromIP(ipaddress) once IP address is found
		getZipFromIP(data.ip);
	});
};

//=================================================
// getZipFromIP(ipaddress)
// Gets the zip code from a users IP address
//=================================================
const getZipFromIP = ipaddress => {
	const ipEndpoint = `http://api.ipapi.com/${ipaddress}?access_key=${ipapiAPIKey}&format=1`;
	$.ajax({
		url: ipEndpoint
	}).then(data => {
		console.log(`Zip code from IP address is: ${data.zip}`);
		// Unload loading animation and update zip code in UI. Timeout for demo purposes only to show off animation.
		setTimeout(pageUnload, 1000);
		setTimeout(updateZipCode, 1000, data.zip);
	});
};

//=================================================
// getLocationInfo(zipcode)
// Gets the latitude, longitude, and town from a zipcode
//=================================================
const getLocationInfo = zipcode => {
	const mapQuestEndpoint = `https://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestAPIKey}&location=${zipcode} United States`;

	$.ajax({
		url: mapQuestEndpoint
	}).then(data => {
		// console.log(data.results[0].locations[0]);
		// console.log(data.results[0].locations[0].adminArea5);
		// console.log(data.results[0].locations[0].latLng);
		const latLngObject = data.results[0].locations[0].latLng;
		const town = data.results[0].locations[0].adminArea5;
		console.log(
			`Location is ${latLngObject.lat}, ${latLngObject.lng} and town is ${town}`
		);
		getWeatherData(latLngObject, town);
	});
};

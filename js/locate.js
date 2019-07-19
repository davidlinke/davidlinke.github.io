//=================================================
// locate.js
//=================================================

//=================================================
// getIP()
// Gets the IP address of the user
//=================================================
const getIP = () => {
	$.ajax({
		url: 'https://api.ipify.org?format=json',
		timeout: 2000,
		success: data => {
			// console.log(`IP address is: ${data.ip}`);
			// Call getZipFromIP(ipaddress) once IP address is found
			getZipFromIP(data.ip);
		},
		error: (request, status, err) => {
			// console.log('Error getting IP address: ' + request + status + err);
			pageUnload();
			displayInput();
		}
	});
};

//=================================================
// getZipFromIP(ipaddress)
// Gets the zip code from a users IP address
//=================================================
const getZipFromIP = ipaddress => {
	const ipEndpoint = `https://api.ipapi.com/${ipaddress}?access_key=${ipapiAPIKey}&format=1`;
	$.ajax({
		url: ipEndpoint,
		timeout: 2000,
		success: data => {
			// console.log(`Zip code from IP address is: ${data.zip}`);
			// Unload loading animation and update zip code in UI. Timeout for demo purposes only to show off animation.
			setTimeout(pageUnload, 1000);
			setTimeout(displayInput, 1000);
			setTimeout(updateZipCode, 1000, data.zip);
			setTimeout(triggerWeatherLookup, 1000); // Display results automatically
		},
		error: (request, status, err) => {
			// console.log('Error getting zip code: ' + request + status + err);
			pageUnload();
			displayInput();
		}
	});
};

//=================================================
// getLocationInfo(zipcode)
// Gets the latitude, longitude, and town from a zipcode
//=================================================
const getLocationInfo = zipcode => {
	const mapQuestEndpoint = `https://open.mapquestapi.com/geocoding/v1/address?key=${mapQuestAPIKey}&location=${zipcode} United States`;

	pageLoad('Searching for rain...');

	$.ajax({
		url: mapQuestEndpoint,
		timeout: 2000,
		success: data => {
			const latLngObject = data.results[0].locations[0].latLng;
			const town = data.results[0].locations[0].adminArea5;
			// console.log(
			// 	`Location is ${latLngObject.lat}, ${latLngObject.lng} and town is ${town}`
			// );
			getWeatherData(latLngObject, town);
		},
		error: (request, status, err) => {
			// console.log('Error getting latitude + longitude: ' + request + status + err);
			alert('Error getting latitude + longitude');
			pageUnload();
		}
	});
};

//=================================================
// storeLocation()
// Stores found or entered location in localStorage
//=================================================
const storeLocation = zip => {
	// console.log(`Storing location ${zip}`);
	localStorage.setItem('location', zip);
};

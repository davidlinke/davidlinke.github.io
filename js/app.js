//=================================================
// app.js
//=================================================

//=================================================
// checkForPreviousVisit()
// Checks to see if user has previously visited the site to use the stored location
//=================================================
const checkForPreviousVisit = () => {
	const zip = localStorage.getItem('location');
	if (zip) {
		displayInput();
		updateZipCode(zip);
		triggerWeatherLookup();
	} else {
		pageLoad('Grabbing your location...'); // Show loading state
		getIP(); // Get IP address, start chain of functions
	}
};

checkForPreviousVisit();

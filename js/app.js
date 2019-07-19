//=================================================
// app.js
//=================================================

// pageLoad('Grabbing your location...'); // Show loading state
// getIP(); // Get IP address, start chain of functions

//=================================================
// checkForPreviousVisit()
// Checks to see if user has previously visited the site to use the stored location
//=================================================
const checkForPreviousVisit = () => {
	if (localStorage.getItem('location')) {
		displayInput();
	} else {
		pageLoad('Grabbing your location...'); // Show loading state
		getIP(); // Get IP address, start chain of functions
	}
};

checkForPreviousVisit();

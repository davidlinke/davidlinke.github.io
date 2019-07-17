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
		// Update zip code in UI
		updateZipCode(data.zip);
	});
};

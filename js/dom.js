//=================================================
// dom.js
//=================================================

//=================================================
// updateZipCode()
// Gets the IP address of the user
//=================================================
const updateZipCode = zipcode => {
	if (zipcode !== null) {
		// Set zip code in UI
		$('#zipCodeInput').attr('value', zipcode);
	}
};

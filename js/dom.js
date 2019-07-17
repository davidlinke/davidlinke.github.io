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

//=================================================
// pageLoad()
// Displays page loading state
//=================================================
const pageLoad = () => {
	const $clouds = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'clouds.svg')
		.addClass('loading');
	const $h2 = $('<h2>')
		.text('Grabbing your location.')
		.addClass('loading');
	$('#content').append($clouds);
	$('#content').append($h2);
};

//=================================================
// pageUnload()
// Removes page loading state
//=================================================
const pageUnload = () => {
	$('.loading').remove();
};

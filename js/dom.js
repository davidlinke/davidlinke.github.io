//=================================================
// dom.js
//=================================================

//=================================================
// updateZipCode()
// Sets zip code to found one if it exists
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
	const $cloudDiv = $('<div>').attr('id', 'cloudDiv');
	$('#content').append($cloudDiv);
	const $clouds = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'clouds.svg')
		.attr('id', 'clouds')
		.addClass('loading');
	const $h2 = $('<h2>')
		.text('Grabbing your location...')
		.addClass('loading');
	$cloudDiv.append($clouds);
	$cloudDiv.append($h2);
};

//=================================================
// pageUnload()
// Removes page loading state
//=================================================
const pageUnload = () => {
	$('.loading').remove();
};

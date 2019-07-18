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
		.attr('data', 'images/clouds.svg')
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

//=================================================
// displayInput()
// Displays zip code input form
//=================================================
const displayInput = () => {
	const $form = $('<form>').attr('onsubmit', 'return false');
	$('#content').append($form);

	const $label = $('<p>').text('Zip Code');
	$form.append($label);

	const $input = $('<input>')
		.attr('type', 'text')
		.attr('id', 'zipCodeInput');
	$form.append($input);

	const $submit = $('<input>')
		.attr('type', 'submit')
		.attr('id', 'zipCodeSubmit')
		.attr('value', 'Get Weather');
	$form.append($submit);

	// Start listener on button
	zipCodeListener();
};

//=================================================
// displayResults()
// Displays results from weather lookup
//=================================================
const displayResults = () => {
	const $resultsDiv = $('<div>').attr('id', 'results');
	$('#content').append($resultsDiv);

	const $morning = $('<div>')
		.attr('id', 'morning')
		.addClass('weatherSection');
	const $morningH4 = $('<h4>').text('Morning');
	$($morning).append($morningH4);

	const $afternoon = $('<div>')
		.attr('id', 'afternoon')
		.addClass('weatherSection');
	const $afternoonH4 = $('<h4>').text('Afternoon');
	$afternoon.append($afternoonH4);

	const $evening = $('<div>')
		.attr('id', 'evening')
		.addClass('weatherSection');
	const $eveningH4 = $('<h4>').text('Evening');
	$evening.append($eveningH4);

	$($resultsDiv).prepend($morning, $afternoon, $evening);

	$resultsDiv.addClass('animated zoomIn');
};

//=================================================
// zipCodeListener()
// Handles user hitting submit on zip code button
//=================================================
const zipCodeListener = () => {
	$('#zipCodeSubmit').on('click', () => {
		// Clear Existing Info
		$('#results').remove();

		let zipcode = $('#zipCodeInput').val();
		displayResults();
		// console.log(zipcode);
		getLocationInfo(zipcode);
	});
};

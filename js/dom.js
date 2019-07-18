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
// pageLoad(loadingText)
// Displays page loading state
//=================================================
const pageLoad = loadingText => {
	const $cloudDiv = $('<div>').attr('id', 'cloudDiv');
	$('#content').append($cloudDiv);
	const $clouds = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'images/clouds.svg')
		.attr('id', 'clouds')
		.addClass('loading');
	const $h2 = $('<h2>')
		.text(loadingText)
		.addClass('loading');
	$cloudDiv.append($clouds);
	$cloudDiv.append($h2);
};

//=================================================
// pageUnload()
// Removes page loading state
//=================================================
const pageUnload = () => {
	$('#cloudDiv').remove();
};

//=================================================
// displayInput()
// Displays zip code input form
//=================================================
const displayInput = () => {
	const $form = $('<form>')
		.attr('onsubmit', 'return false')
		.attr('id', 'zipForm');
	$('#content').append($form);

	// const $label = $('<p>').text('Zip Code');
	// $form.append($label);

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

	const $timeOfDay = $('<div>').attr('id', 'timeOfDay');
	$resultsDiv.append($timeOfDay);

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

	$timeOfDay.append($morning, $afternoon, $evening);

	$resultsDiv.addClass('animated zoomIn');
};

//=================================================
// zipCodeListener()
// Handles user hitting submit on zip code button
//=================================================
const zipCodeListener = () => {
	$('#zipCodeSubmit').on('click', () => {
		triggerWeatherLookup();
	});
};

//=================================================
// triggerWeatherLookup()
// Triggers weather lookup and clears any existing weather info
//=================================================
const triggerWeatherLookup = () => {
	// Clear Existing Info
	$('#results').remove();
	$('#main').removeClass('mainRain');

	let zipcode = $('#zipCodeInput').val();

	getLocationInfo(zipcode);
};

//=================================================
// animateOnRain()
// Animates page elements if rain is predicted
//=================================================
const animateOnRain = () => {
	// Swap umbrella graphic with one with class that opens
	const $umbrellaOpen = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'images/umbrellaOpen.svg')
		.attr('id', 'umbrella');
	$('#umbrella').remove();
	$('#mainInner').prepend($umbrellaOpen);

	// Toggle background rain on
	$('#main').toggleClass('mainRain');
};

//=================================================
// addWeatherDataToPage(morningChance, afternoonChance, eveningChance)
// Updates displayed weather info on page
//=================================================
const addWeatherDataToPage = (
	morningChance,
	afternoonChance,
	eveningChance
) => {
	const $morningH5 = $('<h5>').text(`${Math.floor(morningChance * 100)}%`);
	$('#morning').append($morningH5);
	$('#morning').append($('<h6>').text('chance of rain'));

	const $afternoonH5 = $('<h5>').text(`${Math.floor(afternoonChance * 100)}%`);
	$('#afternoon').append($afternoonH5);
	$('#afternoon').append($('<h6>').text('chance of rain'));

	const $eveningH5 = $('<h5>').text(`${Math.floor(eveningChance * 100)}%`);
	$('#evening').append($eveningH5);
	$('#evening').append($('<h6>').text('chance of rain'));
};

//=================================================
// mainStatus(morningChance, afternoonChance, eveningChance, town)
// Updates displayed weather info on page
//=================================================
const mainStatus = (morningChance, afternoonChance, eveningChance, town) => {
	const $status = $('<h3>').attr('id', 'mainStatus');
	const $subStatus = $('<h3>').attr('id', 'subStatus');

	if (morningChance > 0.5 || afternoonChance > 0.5 || eveningChance > 0.5) {
		if (town !== '') {
			$status.text(`Yes!`);
			$subStatus.text(`Definitely grab your umbrella in ${town} today.`);
		} else {
			$status.text(`Yes!`);
			$subStatus.text(`Definitely grab your umbrella today.`);
		}

		// Trigger rain animations
		animateOnRain();
	} else if (
		morningChance > 0.2 ||
		afternoonChance > 0.2 ||
		eveningChance > 0.2
	) {
		if (town !== '') {
			$status.text(`Maybe.`);
			$subStatus.text(`Use your best judgement in ${town} today.`);
		} else {
			$status.text(`Maybe.`);
			$subStatus.text(`Use your best judgement today.`);
		}
	} else {
		if (town !== '') {
			$status.text(`No!`);
			$subStatus.text(`All clear today in ${town}.`);
		} else {
			$status.text(`No!`);
			$subStatus.text(`All clear today.`);
		}
	}

	$('#results').prepend($subStatus);
	$('#results').prepend($status);
};

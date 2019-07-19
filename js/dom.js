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
// Unloads loading state
//=================================================
const pageUnload = () => {
	$('#cloudDiv');
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
		.attr('value', 'Check Weather');
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
	// $('.uprightUmbrella').removeClass('fallenUmbrella');
	$('#umbrella').remove();
	const $freshUmbrella = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'images/umbrella.svg')
		.attr('id', 'umbrella')
		.addClass('uprightUmbrella');
	$('#umbrella').remove();
	$('#mainInner').prepend($freshUmbrella);

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
// animateOnMaybeRain()
// Animates page elements if rain is maybe predicted
//=================================================
const animateOnMaybeRain = () => {
	// Swap umbrella graphic with one with class that opens
	const $umbrellaRepeat = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'images/umbrellaRepeat.svg')
		.attr('id', 'umbrella');
	$('#umbrella').remove();
	$('#mainInner').prepend($umbrellaRepeat);
};

//=================================================
// animateOnNoRain()
// Animates page elements if no rain is predicted
//=================================================
const animateOnNoRain = () => {
	$('.uprightUmbrella').toggleClass('fallenUmbrella');
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
		animateOnMaybeRain();
		if (town !== '') {
			$status.text(`Maybe.`);
			$subStatus.text(`Use your best judgement in ${town}.`);
		} else {
			$status.text(`Maybe.`);
			$subStatus.text(`Use your best judgement.`);
		}
	} else {
		animateOnNoRain();
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

//=================================================
// showRadar(latLngObject)
// Generates and displays radar modal
//=================================================
const showRadar = (lat, lng) => {
	// const radarURL = `https://darksky.net/map-embed/@radar,${lat},${lng},8.js?embed=true&timeControl=false&fieldControl=false&defaultField=radar`;
	const radarURL =
		'https://darksky.net/map-embed/@radar,41.145871,-73.239481,8.js?embed=true&timeControl=false&fieldControl=false&defaultField=radar';

	const $radar = $('<div>');

	const $viewRadarButton = $('<button>')
		.attr('type', 'button')
		.attr('id', 'viewRadar')
		.text('View Radar');

	$radar.append($viewRadarButton);

	const $radarSVG = $('<object>')
		.attr('id', 'radarSVG')
		.attr('type', 'image/svg+xml')
		.attr('data', 'images/radar.svg');

	$viewRadarButton.append($radarSVG);

	const $radarModalOuter = $('<div>').attr('id', 'radarModalOuter');

	$radar.append($radarModalOuter);

	const $radarModalInner = $('<div>').attr('id', 'radarModalInner');

	// $.getScript(radarURL, (data, status, statusNum) => {
	// 	console.log(data);
	// 	$('#radarModalInner').append(data);
	// 	console.log(`Radar script load status: ${status}`);
	// 	console.log(statusNum);
	// 	console.log(`Radar script load status code: ${statusNum}`);

	// 	// const $closeRadarButton = $('<button>')
	// 	// 	.attr('type', 'button')
	// 	// 	.attr('id', 'closeRadar')
	// 	// 	.text('Close Radar');

	// 	// $radarModalInner.append($closeRadarButton);
	// });

	$.getScript(radarURL).done((data, status, statusNum) => {
		console.log(data);
		$('#radarModalInner').append(data);
		$('#main').append(data);
		console.log(`Radar script load status: ${status}`);
		console.log(statusNum);
		console.log(`Radar script load status code: ${statusNum.status}`);

		// const $closeRadarButton = $('<button>')
		// 	.attr('type', 'button')
		// 	.attr('id', 'closeRadar')
		// 	.text('Close Radar');

		// $radarModalInner.append($closeRadarButton);
	});
	$radarModalOuter.append($radarModalInner);

	$('#content').append($radar);

	// Create button listeners
	radarListeners();
};

//=================================================
// radarListeners()
// Starts event listeners for radar interactivity
//=================================================
const radarListeners = () => {
	const $radarButton = $('#viewRadar');
	// const $radarSVG = $('#radarSVG');
	const $radarModal = $('#radarModalOuter');
	const $radarCloseButton = $('#closeRadar');

	$radarButton.on('click', () => {
		// console.log('radar button clicked');
		$radarModal.css('display', 'block');
	});

	// $radarSVG.on('click', () => {
	// 	console.log('radar svg clicked');
	// 	$radarModal.css('display', 'block');
	// });

	// Need button for mobile users
	$radarCloseButton.on('click', () => {
		// console.log('close radar button clicked');
		$radarModal.css('display', 'none');
	});

	// If clicking outside of the modal and not on the view radar button, close the modal
	$('body').on('click', event => {
		console.log(event);
		if (
			event.target.id != 'radarModalInner' &&
			event.target.id != 'viewRadar'
		) {
			// console.log('clicked outside of radar');
			$radarModal.css('display', 'none');
		}
	});
};

//=================================================
// app.js
//=================================================

pageLoad(); // Show loading state
getIP(); // Get IP address

//=================================================
// addWeatherDataToPage(morningChance, afternoonChance, eveningChance)
// Updates displayed weather info on page
//=================================================
const addWeatherDataToPage = (
	morningChance,
	afternoonChance,
	eveningChance
) => {
	// const phrasing = (timeOfDay, chanceOfRain) => {
	// 	if (chanceOfRain === 0) {
	// 		return `There is no chance of rain this ${timeOfDay}.`;
	// 	} else {
	// 		let chanceOfRainPercent = Math.floor(chanceOfRain * 100);
	// 		return `There is a ${chanceOfRainPercent}% chance it will rain this ${timeOfDay}.`;
	// 	}
	// };

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
	// const $umbrella = $('<object>')
	// 	.attr('type', 'image/svg+xml')
	// 	.attr('data', 'images/umbrella.svg')
	// 	.attr('id', 'umbrella');

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

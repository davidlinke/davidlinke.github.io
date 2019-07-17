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
	const phrasing = (timeOfDay, chanceOfRain) => {
		if (chanceOfRain === 0) {
			return `There is no chance of rain this ${timeOfDay}.`;
		} else {
			let chanceOfRainPercent = Math.floor(chanceOfRain * 100);
			return `There is a ${chanceOfRainPercent}% chance it will rain this ${timeOfDay}.`;
		}
	};

	console.log('function running');

	const $morningH5 = $('<h5>').text(phrasing('morning', morningChance));
	$('#morning').append($morningH5);

	const $afternoonH5 = $('<h5>').text(phrasing('afternoon', afternoonChance));
	$('#afternoon').append($afternoonH5);

	const $eveningH5 = $('<h5>').text(phrasing('evening', eveningChance));
	$('#evening').append($eveningH5);
};

//=================================================
// mainStatus(morningChance, afternoonChance, eveningChance, town)
// Updates displayed weather info on page
//=================================================
const mainStatus = (morningChance, afternoonChance, eveningChance, town) => {
	const $status = $('<h3>');
	const $umbrella = $('<object>')
		.attr('type', 'image/svg+xml')
		.attr('data', 'umbrella.svg')
		.attr('id', 'umbrella');

	if (morningChance > 0.5 || afternoonChance > 0.5 || eveningChance > 0.5) {
		if (town !== '') {
			$status.text(`Yes, definitely grab your umbrella in ${town} today!`);
		} else {
			$status.text(`Yes, definitely grab your umbrella today!`);
		}
		$('.top').css('animation', 'umbrellaAnimationReverse 1.5s ease-in-out 1');
		$('.top').css('display', 'none');
	} else if (
		morningChance > 0.2 ||
		afternoonChance > 0.2 ||
		eveningChance > 0.2
	) {
		if (town !== '') {
			$status.text(
				`Maybe, use your judgement based on when you will be outside in ${town} today.`
			);
		} else {
			$status.text(
				`Maybe, use your judgement based on when you will be outside today.`
			);
		}
	} else {
		if (town !== '') {
			$status.text(`No, all clear today in ${town}!`);
		} else {
			$status.text(`No, all clear today!`);
		}
	}

	$('#results').prepend($umbrella);
	$('#results').prepend($status);
};

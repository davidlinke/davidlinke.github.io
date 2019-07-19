//=================================================
// app.js
//=================================================

pageLoad('Grabbing your location...'); // Show loading state
getIP(); // Get IP address, start chain of functions

const $radarButton = $('#viewRadar');
// const $radarSVG = $('#radarSVG');
const $radarModal = $('#radarModalOuter');
const $radarCloseButton = $('#closeRadar');

$radarButton.on('click', () => {
	console.log('radar button clicked');
	$radarModal.css('display', 'block');
});

// $radarSVG.on('click', () => {
// 	console.log('radar svg clicked');
// 	$radarModal.css('display', 'block');
// });

// Need button for mobile users
$radarCloseButton.on('click', () => {
	console.log('close radar button clicked');
	$radarModal.css('display', 'none');
});

// If clicking outside of the modal and not on the view radar button, close the modal
$('body').on('click', event => {
	console.log(event);
	if (event.target.id != 'radarModalInner' && event.target.id != 'viewRadar') {
		console.log('clicked outside of radar');
		$radarModal.css('display', 'none');
	}
});

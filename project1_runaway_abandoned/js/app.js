// console.log(stops);

// const printStops = (stopObject, index) => {
// 	console.log(stopObject.stop_name);
// };

// stops.forEach(printStops);

//HARDCODE STOPS FOR TESTING
const westport = 134; // Westport stop_id
const grandcentral = 1; // Grand Central stop_id

let westportStops = stop_times.filter(obj => {
	return obj.stop_id === westport;
});

let grandCentralStops = stop_times.filter(obj => {
	return obj.stop_id === grandcentral;
});

const westportTrips = () => {
	const tripsArray = [];
	for (let i = 0; i < westportStops.length; i++) {
		// if (trips.trip_headsign)
		tripsArray.push(westportStops[i].trip_id);

		// 	let foundInGrandCentral = false;
		// 	while (!foundInGrandCentral) {
		// 		let j = 0;
		// 		console.log(`Grand Central Trip ID: ${grandCentralStops[j].trip_id}`);
		// 		console.log(`Westport Trip ID: ${westportStops[j].trip_id}`);
		// 		if (grandCentralStops[j].trip_id === westportStops[i].trip_id) {
		// 			trips.push(grandCentralStops[j].trip_id);
		// 			foundInGrandCentral = true;
		// 		}
		// 		j++;
		// 	}
	}
	console.log(tripsArray);
};

westportTrips();

console.log(westportStops);

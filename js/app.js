const apikey = '2180450fb6c595540f84351dfaa20450';
const lat = '41.042950';
const long = '-73.532360';
const time = Math.round(new Date().getTime() / 1000); // get unix time
// console.log(time);
const endpoint = `https://api.darksky.net/forecast/${apikey}/${lat},${long},${time}?exclude=currently,flags,minutely,daily,alerts`;

// console.log(endpoint);

// const data = $.ajax({
// 	url: endpoint
// });

$.ajax({
	url: endpoint,
	dataType: 'jsonp' // NEED TO SPECIFY THIS FOR IT TO WORK
}).then(data => {
	console.log(data);
});

# Grab your umbrella?

A responsively designed utilitarian website that quickly lets you know if you should grab your umbrella on your way out today.

[https://davidlinke.github.io/](https://davidlinke.github.io/)

![screenshot of page](https://github.com/davidlinke/davidlinke.github.io/blob/master/images/home.png 'Screenshot of page')

## Features

- Automatically gets a users location from their IP address
- User can manually enter their location
- Stores location in localStorage so repeat visits to the site use the same location
- Displays whether one should bring an umbrella with them today based on the rain probability
- Displays rain probabilities broken down by morning, afternoon, and evening
- Displays current precipitation radar
- Whimsical animations that change based on the precipitiation probability

## Technologies

- HTML / CSS
- Javascript
- jQuery
- SVG's + animations

## API's Used

- [Dark Sky](https://darksky.net/) - For hourly weather data and weather radar map
- [Mapquest](https://www.mapquest.com/) - To get latitude and longitude from a general location
- [ipapi](https://ipapi.com/) - To get a users zip code from their IP address
- [ipify](https://www.ipify.org/) - To get a users IP address

## Future Improvements

- Handle API timeouts / non-responses gracefully
- Show additional weather information when hovering over or clicking morning, afternoon, and evening boxes
- Graphically show precipitation percent in morning, afternoon, and evening boxes similar to a bar graph

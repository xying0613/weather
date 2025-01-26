# Weather App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Prerequisite
1. You will need to create an account for [OpenWeatherAPI](https://openweathermap.org/api).
2. Create an API key.
3. Create an `.env` file by copying the content in `.env.sample` and replace the value with your API key.


### To run locally
Run `npm start` and you can open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### To run in Docker
1. You will need to have Docker installed.
2. Run `docker build -t weather-app .` to build the docker image.
3. Run `docker run -p 80:80 weather-app` to start the container and you can open [http://localhost](http://localhost) to view it in your browser.
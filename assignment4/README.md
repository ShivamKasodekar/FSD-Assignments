# Weather Monitoring Dashboard

## Overview
The Weather Monitoring Dashboard is an interactive web application designed to provide users with real-time weather data for various locations. It allows users to monitor current weather conditions, forecasts, and historical data.

## Features
- Real-time weather updates
- Search functionality for multiple locations
- Interactive charts showing historical weather trends
- Theme switching between light and dark mode
- Detailed weather information including temperature, humidity, wind speed, and forecasts

## Technologies
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Backend:** Node.js, Express
- **APIs Used:** OpenWeatherMap API for fetching weather data
- **Charting Library:** Chart.js

## File Structure
```
assignment4/
├── index.html       # Main HTML file for the dashboard
├── styles/          # Directory for CSS files
│   └── styles.css   # Main stylesheet
├── scripts/         # Directory for JavaScript files
│   └── app.js       # Main JavaScript functionality
├── assets/          # Directory for images, icons, etc.
└── README.md        # Documentation for the assignment
```

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/ShivamKasodekar/FSD-Assignments.git
   ```
2. Navigate to the project directory:
   ```bash
   cd FSD-Assignments/assignment4
   ```
3. Install the required packages (if any):
   ```bash
   npm install
   ```
4. Open `index.html` in your web browser.

## JavaScript Functionality
The application uses JavaScript to handle user interactions, API calls, and dynamic content rendering. It includes functions to:
- Fetch weather data from the OpenWeatherMap API
- Update the DOM with the retrieved data
- Handle user inputs and events

## Charts Implementation
The dashboard displays weather trends using charts created with Chart.js. Data is fetched, processed, and passed to the chart library to visualize trends such as temperature fluctuations over time.

## Theme Switching
Users can switch between light and dark themes using a toggle button. This functionality is implemented using CSS classes and JavaScript to dynamically change the page style.

## Data Structures
Data fetched from the API is processed and stored in JavaScript objects and arrays, enabling easy access and manipulation for display purposes.

## Learning Outcomes
- Understanding of API integrations and AJAX requests
- Working knowledge of JavaScript ES6 features
- Experience with responsive design and user interface development

## Future Enhancements
- Adding user authentication to save user preferences
- Implementing a location-based service to automatically fetch weather data
- Enhancing user interface with additional features such as weather alerts and notifications
